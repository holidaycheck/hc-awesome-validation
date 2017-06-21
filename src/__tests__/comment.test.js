import { commentSchema } from '../comment';
import errorMessages from '../errorMessages';

describe('commentSchema', () => {
    it('should return an error message for empty comment', () => {
        const emptyValue = '';
        const result = commentSchema(emptyValue);

        expect(result).toEqual(errorMessages.wrongComment);
    });

    it('should return an error message for comment with no letters', () => {
        const badValue = '1234567';
        const result = commentSchema(badValue);

        expect(result).toEqual(errorMessages.wrongComment);
    });

    it('should return undefined for comment with letters', () => {
        const fieldValue = 'foo123';
        const result = commentSchema(fieldValue);

        expect(result).toEqual(undefined);
    });
});
