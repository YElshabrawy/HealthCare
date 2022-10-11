import express from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        //@ts-ignore
        const token = authHeader?.split(' ')[1];
        //@ts-ignore
        jwt.verify(token, process.env.JWT_ACCESS_KEY);
        next();
    } catch (err) {
        //@ts-ignore
        res.status(500).json(`Invalid Token: ${err.message}`);
        return;
    }
};

export default verifyAuthToken;
