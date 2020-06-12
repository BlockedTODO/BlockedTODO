const tempy = require('tempy');
const {promises: fsPromises} = require('fs');
const downloadRepository = require('./downloadRepository');
const {scanCodebase} = require('parser/');

/* Download repository to a temp folder, run a scan on the codebase, cleanup. */
const downloadAndScan = async (githubClient, repositoryHostId) => {
    const destination = tempy.directory();

    const codeFolder = await downloadRepository(githubClient, repositoryHostId, destination);
    await scanCodebase(codeFolder, repositoryHostId, githubClient);

    // Delete temp folder
    await fsPromises.rmdir(destination, {recursive: true});
};

module.exports = downloadAndScan;
