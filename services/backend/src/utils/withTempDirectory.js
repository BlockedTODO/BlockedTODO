const tempy = require('tempy');
const {promises: fsPromises} = require('fs');

/* Create a temp directory, then run the callback
 * (a function taking the temp directory location as a parameter)
 * Then delete the temp directory */
const withTempDirectory = async (callback) => {
    const tempDirectory = tempy.directory({prefix: 'blockedtodo_'});
    await callback(tempDirectory);
    // Delete temp folder
    await fsPromises.rmdir(tempDirectory, {recursive: true});
};

module.exports = withTempDirectory;
