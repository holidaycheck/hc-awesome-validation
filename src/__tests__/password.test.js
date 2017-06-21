import { newPasswordSchema } from '../password';
import errorMessages from '../errorMessages';

describe('newPasswordSchema', () => {
    it('should return an error message for empty password', () => {
        const emptyValue = '';
        const result = newPasswordSchema(emptyValue);

        expect(result).toEqual(errorMessages.emptyPassword);
    });

    it('should return an error message for to weak password if value is less then 8 characters', () => {
        const toShortValue = '1234567';
        const result = newPasswordSchema(toShortValue);

        expect(result).toEqual(errorMessages.tooWeakPassword);
    });

    it('should return an error message for to weak password if value has not have lower letter', () => {
        const toShortValue = '1234567FF';
        const result = newPasswordSchema(toShortValue);

        expect(result).toEqual(errorMessages.tooWeakPassword);
    });

    it('should return an error message for to weak password if value has not have upper letter', () => {
        const toShortValue = '1234567ff';
        const result = newPasswordSchema(toShortValue);

        expect(result).toEqual(errorMessages.tooWeakPassword);
    });

    it('should return an error message for to weak password if value has not have number', () => {
        const toShortValue = 'fffffffFG';
        const result = newPasswordSchema(toShortValue);

        expect(result).toEqual(errorMessages.tooWeakPassword);
    });

    it('should not return an error for correct password value', () => {
        const toShortValue = 'FooBar1234';
        const result = newPasswordSchema(toShortValue);

        expect(result).toEqual(undefined);
    });
});
