import app from './app.js';

const PORT = parseInt(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`Frontend app listening on port ${PORT}.`);
});
