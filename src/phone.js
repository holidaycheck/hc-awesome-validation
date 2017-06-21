import R from 'ramda';
import { PHONE_NUMBER_REGEX } from './regexes';
import errorMessages from './errorMessages';
import { checkSingle, isRequired, checkMultiple } from './common';

export const isPhoneNumber = checkSingle(R.test(PHONE_NUMBER_REGEX), errorMessages.notValidPhoneNumber);

export const phoneNumberSchema = checkMultiple([
    isRequired(errorMessages.emptyPhoneNumber),
    isPhoneNumber()
]);
