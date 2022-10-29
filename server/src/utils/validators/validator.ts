import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const validator = new Ajv({ allErrors: true });
addFormats(validator);
validator.addFormat(
    'mypassword',
    new RegExp('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')
);
validator.addFormat('username', new RegExp('^[a-zA-Z0-9_]*$')); // Alpha numeric and underscores

export default validator;
