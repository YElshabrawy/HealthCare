import jwt from 'jsonwebtoken';
import { User } from '../models/users';

const generateToken = ({ username, id, email, usertype }: User) => {
    const data = { username, id, email, usertype };
    // @ts-ignore
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_KEY, {
        expiresIn: '10s',
    });
    // @ts-ignore
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY, {
        expiresIn: '14d',
    });
    return { accessToken, refreshToken };
};

export default generateToken;
