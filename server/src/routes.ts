import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './config/cors/corsOptions';
import cookieParser from 'cookie-parser';

import indexRouter from './routers/indexRouter';
import userRouter from './routers/usersRouter';
import authRouter from './routers/authRouter';

export default (app: express.Application) => {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());

    app.use('/', indexRouter);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
};
