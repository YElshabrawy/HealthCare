import express, { Request, Response } from 'express';
import { UserModel, User } from '../models/users';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
const pepper: string = String(process.env.BCRYPT_PW);

// import verifyAuthToken from '../utils/verifyAuthToken';
import jwt from 'jsonwebtoken';

// Validation
import validateData from '../middleware/validateData';
import signupValidator from '../utils/validators/signupValidator';

const authRouter = express.Router();

const userModel = new UserModel();

authRouter.post(
    '/register',
    validateData(signupValidator),
    async (req: Request, res: Response) => {
        try {
            // 1. collect data from body
            //@ts-ignore
            const u: User = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                usertype: req.body.usertype,
            };

            // 2. validate data (#LATER)
            // Checks
            //check if username exsists
            const check1 = await userModel.findUsername(req.body?.username);
            if (check1.length !== 0)
                return res
                    .status(400)
                    .json({ message: 'This username already exists' });

            // check if email exists
            const check2 = await userModel.findEmail(req.body?.email);
            if (check2.length !== 0)
                return res
                    .status(400)
                    .json({ message: 'This email already exists' });

            // post data in users table
            const result = await userModel.create(u);

            // // 4. crate new token
            const tokens = generateToken(result);
            res.cookie('_refresh_token', tokens.refreshToken, {
                httpOnly: true,
            });
            res.json({
                id: result.id,
                username: result.username,
                email: result.email,
                usertype: result.usertype,
                ...tokens,
            });

            //@ts-ignore
        } catch (err: Error) {
            res.status(400).json({ message: err.message });
        }
    }
);

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        // collect data from body
        const { email, password } = req.body;

        // check if email exists
        const result = await userModel.findEmail(email);
        if (result.length === 0)
            return res.status(400).json({ message: 'Invalid email' });

        // compare password
        const validPassword = bcrypt.compareSync(
            password + pepper,
            result[0].password
        );
        if (!validPassword)
            return res.status(400).json({ message: 'Invalid password' });

        // JWT
        const tokens = generateToken(result[0]);
        res.cookie('_refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json({
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            usertype: result[0].usertype,
            ...tokens,
        });
        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json({ message: err.message });
    }
});

authRouter.get('/refresh_token', async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies._refresh_token;
        if (!refreshToken)
            return res.status(401).json({ message: 'Unauthorized User' });
        // @ts-ignore
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
            if (error) return res.status(403).json({ message: error.message });
            // @ts-ignore
            const tokens = generateToken(user);
            res.cookie('_refresh_token', tokens.refreshToken, {
                httpOnly: true,
            });
            res.json({
                // @ts-ignore
                user,
                ...tokens,
            });
        });

        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json(err.message);
    }
});

authRouter.delete('/refresh_token', async (req: Request, res: Response) => {
    try {
        res.clearCookie('_refresh_token');
        return res
            .status(200)
            .json({ message: 'refresh token deleted successfully.' });
        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json(err.message);
    }
});

export default authRouter;
