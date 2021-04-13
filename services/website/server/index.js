import app from './app.js';

const PORT = parseInt(process.env.PORT) || 3002;

app.listen(PORT, () => {
    console.log(`Website listening on port ${PORT}.`);
});
