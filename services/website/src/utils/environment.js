let IS_PRODUCTION = false;

// If the FRONTEND values aren't set, we are running in development mode,
// which means we have access to REACT_APP_ environment variables.
// More details on how this works in server/app.js
if (window.FRONTEND_HOST === '__FRONTEND_HOST__') {
    window.FRONTEND_HOST = process.env.REACT_APP_FRONTEND_HOST;
} else {
    IS_PRODUCTION = true;
}

if (window.FRONTEND_PORT === '__FRONTEND_PORT__') {
    window.FRONTEND_PORT = process.env.REACT_APP_FRONTEND_PORT;
}

if (window.FRONTEND_PROTOCOL === '__FRONTEND_PROTOCOL__') {
    window.FRONTEND_PROTOCOL = process.env.REACT_APP_FRONTEND_PROTOCOL;
}

let FRONTEND_URL = `${window.FRONTEND_PROTOCOL}://${window.FRONTEND_HOST}`;

if (window.FRONTEND_PORT !== '80' && window.FRONTEND_PORT !== '443') {
    FRONTEND_URL = `${FRONTEND_URL}:${window.FRONTEND_PORT}`;
}

export {
    FRONTEND_URL,
    IS_PRODUCTION
};
