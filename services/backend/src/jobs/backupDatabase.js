import util from 'util';
import childProcess from 'child_process';
import {promises as fsPromises} from 'fs';
import {Storage} from '@google-cloud/storage';
import {config, logger, dirpath} from '../utils/index.js';

const exec = util.promisify(childProcess.exec);

// Run a pg_dump of the database, return the location of the database dump file
const dumpDatabase = async () => {
    const fileName = `database-backup-${new Date().toISOString()}.sql`;
    const dumpLocation = `${dirpath(import.meta)}/${fileName}`;

    const {name: database, user, password, host, port} = config.database;

    await exec(
        `pg_dump -d ${database} -U ${user} -h ${host} -p ${port} > ${dumpLocation}`,
        {env: {'PGPASSWORD': password}}
    );

    logger.info(`Dumped db to ${dumpLocation}`);

    return dumpLocation;
};

// Upload a file to a bucket
const uploadToBucket = async (file, bucketName) => {
    if (config.environment !== 'production') {
        logger.info('Not in a production environment, skipping database backup upload.');
        return;
    }

    const storage = new Storage();

    await storage.bucket(bucketName).upload(file);

    logger.info(`file ${file} was uploaded ${bucketName} bucket`);
};

const backupDatabase = async () => {
    const dumpLocation = await dumpDatabase();

    await uploadToBucket(dumpLocation, config.database.backupsBucketName);

    // Delete database dump file
    await fsPromises.unlink(dumpLocation);

    return 'success';
};

const onSuccess = (result) => {
    logger.info({result});
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error({error});
    process.exit(1); // Error exit code
};

// Run code synchronously to ensure proper process error codes are returned.
backupDatabase().then(onSuccess).catch(onError);
