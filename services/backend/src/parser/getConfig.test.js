import getConfig from './getConfig.js';
import tempy from 'tempy';
import {DEFAULT_CONFIG} from '../utils/index.js';
import {promises as fsPromises} from 'fs';

const configText = `
    comment_prefixes:
      - prefix1
      - Second prefix
`;
const validatedConfig = {comment_prefixes: ['prefix1', 'Second prefix']};

describe('getConfig', () => {
    it('reads a valid config file', async () => {
        await tempy.directory.task(async (codeFolder) => {
            await fsPromises.writeFile(`${codeFolder}/.blockedtodo.yaml`, configText);
            const config = await getConfig(codeFolder);

            expect(config).toMatchObject(validatedConfig);
        });
    });

    it('returns the default config when the provided config file has invalid syntax', async () => {
        await tempy.directory.task(async (codeFolder) => {
            const text = 'invalid yaml syntax';
            await fsPromises.writeFile(`${codeFolder}/.blockedtodo.yaml`, text);
            const config = await getConfig(codeFolder);

            expect(config).toMatchObject(DEFAULT_CONFIG);
        });
    });

    it('returns the default config when no config file is present', async () => {
        await tempy.directory.task(async (codeFolder) => {
            const config = await getConfig(codeFolder);
            expect(config).toMatchObject(DEFAULT_CONFIG);
        });
    });
});
