import R from 'ramda';

import {
    isNonEmptyTrimmedString, hasLengthBetween as hasLengthBetweenPredicate,
    isEqualOrShorterThan as isEqualOrShorterThanPredicate
} from './predicates';
import { NUMBER_REGEX, WITHOUT_NUMBER_REGEX, WITH_LETTER_REGEX } from './regexes';
import errorMessages from './errorMessages';

export const check = R.curry((predicate, msg, val) => {
    return predicate(val) ? undefined : msg;
});

export const checkMultiple = R.curry((predicates, value) => {
    const firstFailedPredicate = R.find((predicate) => {
        return Boolean(predicate(value));
    }, predicates);

    return firstFailedPredicate ? firstFailedPredicate(value) : undefined;
});

export const setupCheck = (checkCallback) => (predicate, defaultMessage) => (customMessage) => {
    return checkCallback(predicate, customMessage || defaultMessage);
};

export const checkSingle = setupCheck(check);

export const isRequired = checkSingle(isNonEmptyTrimmedString, errorMessages.emptyField);
export const isNumber = checkSingle(R.test(NUMBER_REGEX), errorMessages.numberField);

export const hasLengthBetween = (from, to) => checkSingle(
    hasLengthBetweenPredicate(from, to), errorMessages.fieldWrongLength
);
export const isEqualOrShorterThan = (length) => checkSingle(
    isEqualOrShorterThanPredicate(length), errorMessages.toShortFieldValue
);
export const isStringWithoutNumbers = checkSingle(R.test(WITHOUT_NUMBER_REGEX), errorMessages.fieldWithNumbers);
export const hasAtLeastOneLetter = checkSingle(R.test(WITH_LETTER_REGEX), errorMessages.fieldWithNumbersOnly);

export const createNameSchema = (fieldName) => checkMultiple([
    isRequired(errorMessages[`${fieldName}Empty`] || ''),
    hasLengthBetween(2, 50)(errorMessages[`${fieldName}WrongLength`] || ''),
    isStringWithoutNumbers(errorMessages[`${fieldName}WithNumbers`] || '')
]);
