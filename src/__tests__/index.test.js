import validate, {
    isRequired,
    isNumber,
    hasLengthBetween,
    isEqualOrShorterThan,
    isStringWithoutNumbers,
    hasAtLeastOneLetter,
    setupCheck,
    createNameSchema
} from '../';
import errorMessages from '../errorMessages';

describe('validate', () => {
    it('should return error from predicate formatted by intl', () => {
        const formValues = {
            fieldNameFoo: 'foo',
            fieldNameBar: ''
        };
        const schema = {
            fieldNameFoo: isRequired(),
            fieldNameBar: isRequired()
        };
        const props = { intl: { formatMessage: () => 'This field should not be empty' } };
        const expectedResult = {
            fieldNameBar: 'This field should not be empty'
        };
        const result = validate(schema)(formValues, props);

        expect(result).toEqual(expectedResult);
    });

    it('should call each schemas and intl.formatMessage for passed error messages', () => {
        const formValues = {
            fieldNameFoo: 'foo',
            fieldNameBar: ''
        };
        const errorMessage = { id: 'foo.bar', defaultMessage: 'error message' };
        const schema = {
            fieldNameFoo: jest.fn().mockReturnValueOnce(undefined),
            fieldNameBar: jest.fn().mockReturnValueOnce(errorMessage)
        };
        const formatMessageStub = jest.fn(() => undefined)
            .mockImplementationOnce(() => 'error message')
            .mockImplementationOnce(() => undefined);

        const props = { intl: { formatMessage: formatMessageStub } };
        const expectedResult = {
            fieldNameBar: 'error message'
        };

        const result = validate(schema)(formValues, props);

        expect(schema.fieldNameFoo).toHaveBeenCalledWith('foo');
        expect(schema.fieldNameBar).toHaveBeenCalledWith('');

        expect(props.intl.formatMessage).toHaveBeenCalledWith(errorMessage);

        expect(result).toEqual(expectedResult);
    });

    it('should filter out values that are not in schema to not validate them', () => {
        const formValues = {
            fieldNameFoo: 'foo',
            fieldNameBar: 'foo',
            fieldNameBaz: ''
        };
        const schema = {
            fieldNameFoo: isRequired(),
            fieldNameBar: isRequired()
        };
        const props = { intl: { formatMessage: () =>  {} } };
        const expectedResult = {};
        const result = validate(schema)(formValues, props);

        expect(result).toEqual(expectedResult);
    });

    it('should set empty values for fields that werent changed yet', () => {
        const formValues = {
            fieldNameFoo: 'foo'
        };
        const schema = {
            fieldNameFoo: isRequired(),
            fieldNameBar: isRequired()
        };
        const props = { intl: { formatMessage: () => 'This field should not be empty' } };
        const expectedResult = {
            fieldNameBar: 'This field should not be empty'
        };
        const result = validate(schema)(formValues, props);

        expect(result).toEqual(expectedResult);
    });

    it('should trim string and not return error', () => {
        const formValues = {
            fieldNameFoo: ' foo '
        };
        const schema = {
            fieldNameFoo: isRequired()
        };
        const props = { intl: { formatMessage: () =>  {} } };
        const expectedResult = {};
        const result = validate(schema)(formValues, props);

        expect(result).toEqual(expectedResult);
    });

    it('should not trim Boolean and return error for empty field', () => {
        const formValues = {
            fieldNameFoo: false
        };
        const schema = {
            fieldNameFoo: isRequired()
        };
        const props = { intl: { formatMessage: () => 'This field should not be empty' } };
        const expectedResult = {
            fieldNameFoo: 'This field should not be empty'
        };
        const result = validate(schema)(formValues, props);

        expect(result).toEqual(expectedResult);
    });
});

describe('setupCheck', () => {
    it('should invoke check callback with proper arguments', () => {
        const checkSpy = jest.fn();
        const predicate = () => { };
        const privateMessage = 'foo meesage';

        setupCheck(checkSpy)(predicate, privateMessage)();

        expect(checkSpy).toHaveBeenCalledWith(predicate, privateMessage);
    });

    describe('when custom error message is passed', () => {
        it('should call checkCallback with that message', () => {
            const checkSpy = jest.fn();
            const predicate = () => { };
            const defaultMessage = 'foo meesage';
            const customMessage = 'bar meesage';

            setupCheck(checkSpy)(predicate, defaultMessage)(customMessage);

            expect(checkSpy).toHaveBeenCalledWith(predicate, customMessage);
        });
    });
});

describe('createNameSchema', () => {
    describe('when existing in errorMessages fieldName is passed', () => {
        it('should return validation shema with that messages', () => {
            const firstNameSchemaTest = createNameSchema('firstName');

            const resultForEmptyString = firstNameSchemaTest('');
            const expectedResultForEmptyString = errorMessages.firstNameEmpty;

            const resultForWrongLengthString = firstNameSchemaTest('f');
            const expectedResultForWrongLengthString = errorMessages.firstNameWrongLength;

            const resultForStringWithNumber = firstNameSchemaTest('f1');
            const expectedResultForStringWithNumber = errorMessages.firstNameWithNumbers;

            expect(resultForEmptyString).toEqual(expectedResultForEmptyString);
            expect(resultForWrongLengthString).toEqual(expectedResultForWrongLengthString);
            expect(resultForStringWithNumber).toEqual(expectedResultForStringWithNumber);
        });
    });

    describe('when fieldName does not exist in errorMessages', () => {
        it('should return shema with default messages', () => {
            const genericSchemaWithWrongFieldName = createNameSchema('firs');

            const resultForEmptyString = genericSchemaWithWrongFieldName('');
            const expectedResultForEmptyString = errorMessages.emptyField;

            const resultForWrongLengthString = genericSchemaWithWrongFieldName('f');
            const expectedResultForWrongLengthString = errorMessages.fieldWrongLength;

            const resultForStringWithNumber = genericSchemaWithWrongFieldName('f1');
            const expectedResultForStringWithNumber = errorMessages.fieldWithNumbers;

            expect(resultForEmptyString).toEqual(expectedResultForEmptyString);
            expect(resultForWrongLengthString).toEqual(expectedResultForWrongLengthString);
            expect(resultForStringWithNumber).toEqual(expectedResultForStringWithNumber);
        });
    });

    describe('when fieldName is not passed', () => {
        it('should return shema with default messages', () => {
            const genericSchemaWithoutFieldName = createNameSchema();

            const resultForEmptyString = genericSchemaWithoutFieldName('');
            const expectedResultForEmptyString = errorMessages.emptyField;

            const resultForWrongLengthString = genericSchemaWithoutFieldName('f');
            const expectedResultForWrongLengthString = errorMessages.fieldWrongLength;

            const resultForStringWithNumber = genericSchemaWithoutFieldName('f1');
            const expectedResultForStringWithNumber = errorMessages.fieldWithNumbers;

            expect(resultForEmptyString).toEqual(expectedResultForEmptyString);
            expect(resultForWrongLengthString).toEqual(expectedResultForWrongLengthString);
            expect(resultForStringWithNumber).toEqual(expectedResultForStringWithNumber);
        });
    });
});

describe('isRequired', () => {
    it('should return an error message for empty value', () => {
        const emptyFieldValue = '';
        const result = isRequired()(emptyFieldValue);

        expect(result).toEqual(errorMessages.emptyField);
    });

    it('should return undefined when value exist', () => {
        const fieldValue = 'foo';
        const result = isRequired()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('isNumber', () => {
    it('should return an error message for non numeric value', () => {
        const notANumberValue = 'foo';
        const result = isNumber()(notANumberValue);

        expect(result).toEqual(errorMessages.numberField);
    });

    it('should return undefined when value is an number', () => {
        const fieldValue = '1234';
        const result = isNumber()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('hasLengthBetween', () => {
    it('should return an error message for string longer then 50 characters', () => {
        const badValue = '123456789012345678901234567890123456789012345678901';
        const result = hasLengthBetween(2, 50)()(badValue);

        expect(result).toEqual(errorMessages.fieldWrongLength);
    });

    it('should return an error message when value is shorter that 2', () => {
        const badValue = '1';
        const result = hasLengthBetween(2, 50)()(badValue);

        expect(result).toEqual(errorMessages.fieldWrongLength);
    });

    it('should return undefined when value is correct', () => {
        const fieldValue = '1234567890';
        const result = hasLengthBetween(2, 50)()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('isEqualOrShorterThan', () => {
    it('should return an error message for string longer then 10 characters', () => {
        const badValue = '123456789010';
        const result = isEqualOrShorterThan(10)()(badValue);

        expect(result).toEqual(errorMessages.toShortFieldValue);
    });

    it('should return undefined when value is shorter or equal than 10', () => {
        const fieldValue = '123456789';
        const result = isEqualOrShorterThan(10)()(fieldValue);

        expect(result).toEqual(undefined);
    });

    it('should return undefined when value is not a string', () => {
        const fieldValue = undefined;
        const result = isEqualOrShorterThan(10)()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('isStringWithoutNumbers', () => {
    it('should return an error message for string with number', () => {
        const badValue = 'foo1';
        const result = isStringWithoutNumbers()(badValue);

        expect(result).toEqual(errorMessages.fieldWithNumbers);
    });

    it('should return undefined when value is string without numbers', () => {
        const fieldValue = 'foo';
        const result = isStringWithoutNumbers()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('hasAtLeastOneLetter', () => {
    it('should return an error message for string with number only', () => {
        const badValue = '123';
        const result = hasAtLeastOneLetter()(badValue);

        expect(result).toEqual(errorMessages.fieldWithNumbersOnly);
    });

    it('should return undefined when value is string with letters', () => {
        const fieldValue = 'f123';
        const result = hasAtLeastOneLetter()(fieldValue);

        expect(result).toEqual(undefined);
    });
});
