import { hasMinLength8, hasLowerLetter, hasUpperLetter, hasNumber } from './predicates';
import errorMessages from './errorMessages';
import { isRequired, checkSingle, checkMultiple } from './common';

export const newPasswordSchema = checkMultiple([
    isRequired(errorMessages.emptyPassword),
    checkSingle(hasMinLength8, errorMessages.tooWeakPassword)(),
    checkSingle(hasLowerLetter, errorMessages.tooWeakPassword)(),
    checkSingle(hasUpperLetter, errorMessages.tooWeakPassword)(),
    checkSingle(hasNumber, errorMessages.tooWeakPassword)()
]);
