import { isEmail, emailSchema } from '../email';
import errorMessages from '../errorMessages';

describe('isEmail', () => {
    it('should return an error message for non email alike value', () => {
        const notAEmailValue = 'foo';
        const result = isEmail()(notAEmailValue);

        expect(result).toEqual(errorMessages.notValidEmail);
    });

    it('should return undefined when value is an email', () => {
        const fieldValue = 'foo@bar.com';
        const result = isEmail()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('emailSchema', () => {
    it('should return an error message for required email', () => {
        const emailFieldValue = '';
        const result = emailSchema(emailFieldValue);

        expect(result).toEqual(errorMessages.emptyEmail);
    });

    it('should return an error message for wrong email', () => {
        const emailFieldValue = 'foo';
        const result = emailSchema(emailFieldValue);

        expect(result).toEqual(errorMessages.notValidEmail);
    });

    it('should return undefined for correct value', () => {
        const emailFieldValue = 'foo@bar.com';
        const result = emailSchema(emailFieldValue);

        expect(result).toEqual(undefined);
    });
});
