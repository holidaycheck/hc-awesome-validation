import R from 'ramda';

import { isRequired, checkSingle, checkMultiple } from './common';
import { EMAIL_REGEX } from './regexes';
import errorMessages from './errorMessages';

export const isEmail = checkSingle(R.test(EMAIL_REGEX), errorMessages.notValidEmail);

export const emailSchema = checkMultiple([
    isRequired(errorMessages.emptyEmail),
    isEmail()
]);
