/* A repl server for BlockedTODO.
 * It behaves in a similar manner to rails console.
 * Run with `node --experimental-repl-await ./repl.js` */
const repl = require('repl');
const {db, ...models} = require('db/');

// Helper methods to add in the context of the repl
const getOwnMethods = (object) => {
    return Object.getOwnPropertyNames(object).filter((property) => typeof object[property] == 'function');
};

const getAllMethods = (object) => {
    const methods = [];
    for (const method in object) {
        if (typeof object[method] == 'function') {
            methods.push(method);
        }
    }
    return methods;
};

const getOwnAttributes = (object) => {
    return Object.getOwnPropertyNames(object).filter((property) => typeof object[property] != 'function');
};

const getAllAttributes = (object) => {
    const methods = [];
    for (const method in object) {
        if (typeof object[method] != 'function') {
            methods.push(method);
        }
    }
    return methods;
};

const printDepth = (object, depth) => {
    console.dir(object, {depth: depth});
}

// Create repl server
const replServer = repl.start({
    prompt: '> ',
});

// Import in the context of the repl server
Object.assign(replServer.context, {
    db,
    ...models,
    printDepth,
    getOwnMethods,
    getAllMethods,
    getOwnAttributes,
    getAllAttributes,
});
