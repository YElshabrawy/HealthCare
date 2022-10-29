import { Request, Response, NextFunction } from 'express';
import { ValidateFunction } from 'ajv';

function validateData(ajvValidate: ValidateFunction) {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = ajvValidate(req.body);
        if (!valid) {
            const errors = ajvValidate.errors;
            console.log(errors);
            const errorMessages: Array<string | undefined> = [];
            errors?.forEach((err) => {
                if (err.keyword === 'format') {
                    const inputName = err.instancePath.substring(1);
                    switch (inputName) {
                        case 'username':
                            errorMessages.push(
                                'Username should only have alphabets, numbers, and underscores.'
                            );
                            break;
                        case 'password':
                            errorMessages.push(
                                'Password should have at least one uppercase letter, one lowercase, and one number'
                            );
                            break;

                        case 'email':
                            errorMessages.push('Please enter a valid email.');
                            break;

                        default:
                            break;
                    }
                } else if (err.keyword === 'required') {
                    errorMessages.push(
                        capitalizeFirstLetter(err.params.missingProperty) +
                            ' is required'
                    );
                } else {
                    errorMessages.push(
                        err.instancePath
                            ? `${capitalizeFirstLetter(
                                  err.instancePath.substring(1)
                              )} ${err.message}`
                            : //@ts-ignore
                              capitalizeFirstLetter(err.message)
                    );
                }
            });

            return res.status(400).json(errorMessages);
        }
        next();
    };
}

export default validateData;

function capitalizeFirstLetter(str: string) {
    // converting first letter to uppercase
    const capitalized = str.replace(/^./, str[0].toUpperCase());

    return capitalized;
}
