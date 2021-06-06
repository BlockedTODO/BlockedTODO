import {filepath, dirpath, filename, dirname, resolvePath} from './pathHelpers.js';

describe('filepath', () => {
    it('returns the path from the project root to the current file', () => {
        expect(filepath(import.meta)).toEqual('/backend/src/utils/pathHelpers.test.js');
    });
});

describe('dirpath', () => {
    it('returns the path from the project root to the current file\'s parent directory', () => {
        expect(dirpath(import.meta)).toEqual('/backend/src/utils');
    });
});

describe('filename', () => {
    it('returns the name of the current file', () => {
        expect(filename(import.meta)).toEqual('pathHelpers.test.js');
    });
});

describe('dirname', () => {
    it('returns the name of the current file\'s parent directory', () => {
        expect(dirname(import.meta)).toEqual('utils');
    });
});

describe('resolvePath', () => {
    it('resolves a path from its components', () => {
        const resolvedPath = resolvePath(dirpath(import.meta), filename(import.meta));
        expect(resolvedPath).toEqual('/backend/src/utils/pathHelpers.test.js');
    });
});
