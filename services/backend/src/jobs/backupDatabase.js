const util = require('util');
const childProcess = require('child_process');
const knexConfig = require('../db/config/knexfile');
const {logger} = require('utils/');

const environment = process.env.NODE_ENV || 'development';
const exec = util.promisify(childProcess.exec);

/* BlockedTODO: https://github.com/smooth-code/knex-scripts/issues/11
 * Use knex-scripts instead of this manual part to run pg_dump */
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

const backupDatabase = async () => {
    const dumpLocation = await dumpDatabase();

    return 'success'
};

const onSuccess = (result) => {
    logger.info(result);
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error(error.message);
    process.exit(1);
}

// Run code synchronously to ensure proper process error codes are returned.
backupDatabase().then(onSuccess).catch(onError);
