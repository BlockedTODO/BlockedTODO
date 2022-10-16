export const urlString = (protocol, host, port) => {
    if (port.toString() !== '80' && port.toString() !== '443') {
        return `${protocol}://${host}:${port}`;
    }

    return `${protocol}://${host}`;
};
