import { isPhoneNumber, phoneNumberSchema } from '../phone';
import errorMessages from '../errorMessages';

describe('isPhoneNumber', () => {
    it('should return an error message for non phone alike value', () => {
        const notAPhoneValue = 'foo';
        const result = isPhoneNumber()(notAPhoneValue);

        expect(result).toEqual(errorMessages.notValidPhoneNumber);
    });

    it('should return undefined when value is an phone number', () => {
        const fieldValue = '+00 00 0000000';
        const result = isPhoneNumber()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('phoneNumberSchema', () => {
    it('should return an error message for required phone number', () => {
        const phoneNumberValue = '';
        const result = phoneNumberSchema(phoneNumberValue);

        expect(result).toEqual(errorMessages.emptyPhoneNumber);
    });

    it('should return an error message for wrong phone number format', () => {
        const phoneNumberValue = '1';
        const result = phoneNumberSchema(phoneNumberValue);

        expect(result).toEqual(errorMessages.notValidPhoneNumber);
    });

    it('should return undefined for correct value', () => {
        const phoneNumberValue = '+00 000 000 0000';
        const result = phoneNumberSchema(phoneNumberValue);

        expect(result).toEqual(undefined);
    });
});
