import R from 'ramda';

export { emailSchema, isEmail } from './email';
export { isOfficialAddress, isValidAddress, isAbsoluteUrl, websiteSchema } from './website';
export { newPasswordSchema } from './password';
export { isPhoneNumber, phoneNumberSchema } from './phone';
export { commentSchema } from './comment';
export { firstNameSchema } from './firstName';
export { lastNameSchema } from './lastName';
export {
    isRequired,
    isNumber,
    hasLengthBetween,
    isEqualOrShorterThan,
    isStringWithoutNumbers,
    hasAtLeastOneLetter,
    setupCheck,
    createNameSchema
} from './common';

const reduceToFieldsOnlyInSchema = (schema, values) => R.pipe(
    R.keys,
    R.reduce((acc, val) => {
        return schema[val] !== undefined ? { ...acc, [val]: values[val] } : acc;
    }, {})
);

const setEmptyValues = (schema, values) => R.pipe(
    R.keys,
    R.reduce((acc, val) => {
        return acc[val] === undefined ? { ...acc, [val]: '' } : acc;
    }, { ...values })
)(schema);

const trimConditionally = (val) => {
    return R.type(val) === 'String' ? R.trim(val) : val;
};

export default (schema) => (values, { intl }) => {
    const initialValues = setEmptyValues(schema, values);

    return R.pipe(
        reduceToFieldsOnlyInSchema(schema, initialValues),
        R.map(trimConditionally),
        R.evolve(schema),
        R.reject(R.isNil),
        R.map((message) => intl.formatMessage(message))
    )(initialValues);
};
