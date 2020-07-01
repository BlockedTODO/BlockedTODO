'use strict';

const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Frontend app listening on port ${PORT}.`);
});
