const util = require('util');
const childProcess = require('child_process');
const {promises: fsPromises} = require('fs');
const {Storage} = require('@google-cloud/storage');
const knexConfig = require('../db/config/knexfile');
const {logger} = require('utils/');

const environment = process.env.NODE_ENV || 'development';
const exec = util.promisify(childProcess.exec);

// Run a pg_dump of the database, return the location of the database dump file
const dumpDatabase = async () => {
    const fileName = `database-backup-${new Date().toISOString()}.sql`;
    const dumpLocation = `${__dirname}/${fileName}`;

    const {database, user, password, host, port} = knexConfig[environment].connection;

    await exec(
        `pg_dump -d ${database} -U ${user} -h ${host} -p ${port} > ${dumpLocation}`,
        {env: {'PGPASSWORD': password}}
    );

    return dumpLocation;
};

// Upload a file to a bucket
const uploadToBucket = async (file, bucketName) => {
    if (environment !== 'production') {
        logger.info('Not in a production environment, skipping database backup upload.');
        return;
    }

    const storage = new Storage();

    await storage.bucket(bucketName).upload(file);

    logger.info(`file ${file} was uploaded ${bucketName} bucket`);
};

const backupDatabase = async () => {
    const dumpLocation = await dumpDatabase();

    const bucketName = process.env.BACKUPS_BUCKET_NAME;
    await uploadToBucket(dumpLocation, bucketName);

    // Delete database dump file
    await fsPromises.unlink(dumpLocation);

    return 'success';
};

const onSuccess = (result) => {
    logger.info(result);
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error(error.message);
    process.exit(1); // Error exit code
};

// Run code synchronously to ensure proper process error codes are returned.
backupDatabase().then(onSuccess).catch(onError);
