import express, { Request, Response } from 'express';
import { UserModel, User } from '../models/users';

import bcrypt from 'bcrypt';

const pepper: string = String(process.env.BCRYPT_PW);
const saltRounds = parseInt(String(process.env.BCRYPT_ROUNDS));

const usersRouter = express.Router();

const userModel = new UserModel();

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userModel.index();
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(404).json(err.message);
    }
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.show(id);
        if (!result) {
            throw new Error(`Could not find user ${id}`);
        }
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(404).json(err.message);
    }
});

usersRouter.post('/', async (req, res) => {
    try {
        //@ts-ignore
        const u: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            usertype: req.body.usertype,
        };
        const result = await userModel.create(u);
        res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json(err.message);
    }
});

usersRouter.put('/:id', async (req, res) => {
    try {
        const oldUser = await userModel.show(parseInt(req.params.id));
        let newUser = { ...oldUser };
        Object.keys(oldUser).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                if (key === 'password') {
                    console.log('password has changed');
                    const hashedPassword = bcrypt.hashSync(
                        req.body[key] + pepper,
                        saltRounds
                    );
                    newUser = { ...newUser, [key]: hashedPassword };
                } else {
                    newUser = { ...newUser, [key]: req.body[key] };
                }
            }
        });
        const result = await userModel.modify(newUser);
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json(err.message);
    }
});

usersRouter.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.delete(id);
        if (!result) {
            throw new Error(`Could not find user ${id}`);
        }
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(404).json(err.message);
    }
});

export default usersRouter;
