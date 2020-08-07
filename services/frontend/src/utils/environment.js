let IS_PRODUCTION = false;

// If the BACKEND values aren't set, we are running in development mode,
// which means we have access to REACT_APP_ environment variables.
// More details on how this works in server/app.js
if (window.BACKEND_HOST === '__BACKEND_HOST__') {
    window.BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
} else {
    IS_PRODUCTION = true;
}

if (window.BACKEND_PORT === '__BACKEND_PORT__') {
    window.BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
}

if (window.BACKEND_PROTOCOL === '__BACKEND_PROTOCOL__') {
    window.BACKEND_PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL;
}

let BACKEND_URL = `${window.BACKEND_PROTOCOL}://${window.BACKEND_HOST}`;

if (window.BACKEND_PORT !== '80' && window.BACKEND_PORT !== '443') {
    BACKEND_URL = `${BACKEND_URL}:${window.BACKEND_PORT}`;
}

export {
    BACKEND_URL,
    IS_PRODUCTION,
};
