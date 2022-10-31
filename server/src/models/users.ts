import client from '../database';
import bcrypt from 'bcrypt';

const pepper: string = String(process.env.BCRYPT_PW);
const saltRounds = parseInt(String(process.env.BCRYPT_ROUNDS));

export type User = {
    id: Number;
    firstname: String;
    lastname: String;
    username: String;
    email: String;
    password: String;
    usertype: Number; // 1 for admin, 2 for doctors, 3 for patients
};

export interface MyUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    usertype: number;
}

export class UserModel {
    async index() {
        try {
            const conn = await client.connect();
            const sql = 'select * from users ORDER BY id ASC;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not find users. Error: ${err}`);
        }
    }

    async show(id: number) {
        try {
            const conn = await client.connect();
            const sql = `select * from users WHERE id=${id};`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async findEmail(email: string) {
        try {
            const conn = await client.connect();
            const sql = `select * from users WHERE email = $1;`;
            const result = await conn.query(sql, [email]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find user with email "${email}". Error: ${err}`
            );
        }
    }
    async findUsername(username: string) {
        try {
            const conn = await client.connect();
            const sql = `select * from users WHERE username = $1;`;
            const result = await conn.query(sql, [username]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find user with username "${username}". Error: ${err}`
            );
        }
    }

    async create(u: User) {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO users(firstname, lastname, username, email, password, usertype) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

            const hashedPassword = bcrypt.hashSync(
                u.password + pepper,
                saltRounds
            );

            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                u.email,
                hashedPassword,
                u.usertype,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add user. Error: ${err}`);
        }
    }

    async modify(u: User) {
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE users SET firstname=$1, lastname = $2, username = $3, email = $4, password = $5, usertype = $6 WHERE id = $7 RETURNING *';
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                u.email,
                u.password,
                u.usertype,
                u.id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user. Error: ${err}`);
        }
    }

    async delete(id: number) {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM users WHERE id=${id} RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
