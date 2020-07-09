'use strict';

const app = require('./app');
const PORT = parseInt(process.env.PORT) || 3002;

app.listen(PORT, () => {
    console.log(`Website listening on port ${PORT}.`);
});
