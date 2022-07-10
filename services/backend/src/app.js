import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {errorHandler, passport, sessions, githubWebhooks} from './middleware/index.js';
import {authRouter, githubRouter} from './routes/index.js';

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: '10mb'}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // eslint-disable-line

app.use(cookieParser());
app.use(sessions());

app.use(passport.initialize());
app.use(passport.session());

app.use(githubWebhooks);

app.get('/', (req, res, next) => res.send('BlockedTODO Backend Server'));
app.get('/ping', (req, res, next) => res.send('Pong!'));

app.use('/auth', authRouter);
app.use('/github', githubRouter);

app.use(errorHandler);

export default app;
