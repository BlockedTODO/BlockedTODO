/*
 * Production server that serves the build/ folder.
 * The main reason for using this is so that we can inject environment variables in the frontend in production builds.
 *
 * This file is a combination of the following two strategies:
 * https://create-react-app.dev/docs/title-and-meta-tags/#injecting-data-from-the-server-into-the-page
 * https://create-react-app.dev/docs/deployment/#other-solutions
 *
 * In dev mode, we use environment variables prefixed with 'REACT_APP_' (which doesn't work with production builds)
 * More info: https://create-react-app.dev/docs/adding-custom-environment-variables#referencing-environment-variables-in-the-html
 *
 * In the code, these two approaches are merged in the src/utils/environment.js file so that we can just import the variables.
 * In short, there are three relevant files: server/app.js, public/index.html, and src/utils/environment.js
 *
 */
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';

const parentFolder = path.dirname(fileURLToPath(import.meta.url))
const app = express();

const renderApp = (req, res) => {
    const filePath = path.resolve(parentFolder, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (error, htmlData) => {
        if (error) {
            console.error('read error', error);
            res.sendStatus(404);
        }

        const rendered = htmlData.replace('__BACKEND_HOST__', process.env.REACT_APP_BACKEND_HOST)
                                 .replace('__BACKEND_PORT__', process.env.REACT_APP_BACKEND_PORT)
                                 .replace('__BACKEND_PROTOCOL__', process.env.REACT_APP_BACKEND_PROTOCOL)

        res.send(rendered);
    });
};

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.get('/', renderApp);
app.use(express.static(path.resolve(parentFolder, '..', 'build')));
app.get('*', renderApp);

export default app;
