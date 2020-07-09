'use strict';

const app = require('./app');
const PORT = parseInt(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`Frontend app listening on port ${PORT}.`);
});
