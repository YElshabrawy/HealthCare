import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import indexRouter from './routers/indexRouter';
import userRouter from './routers/userRouter';

export default (app: express.Application) => {
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/', indexRouter);
    app.use('/users', userRouter);
};
