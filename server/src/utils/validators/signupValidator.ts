import validator from './validator';
import { JSONSchemaType } from 'ajv';
import { MyUser } from '../../models/users';

const userschema: JSONSchemaType<MyUser> = {
    type: 'object',
    properties: {
        firstname: { type: 'string', minLength: 2, maxLength: 30 },
        lastname: { type: 'string', minLength: 2, maxLength: 30 },
        username: {
            type: 'string',
            format: 'username',
            minLength: 3,
            maxLength: 30,
        },
        email: { type: 'string', format: 'email' },
        password: {
            type: 'string',
            format: 'mypassword',
            minLength: 8,
            maxLength: 128,
        },
        usertype: { type: 'integer', enum: [1, 2, 3] },
    },
    required: [
        'firstname',
        'lastname',
        'email',
        'password',
        'username',
        'usertype',
    ],
    additionalProperties: false,
};

const validate = validator.compile(userschema);

export default validate;
