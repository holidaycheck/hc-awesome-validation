import R from 'ramda';

import { checkSingle, checkMultiple } from './common';
import errorMessages from './errorMessages';

const checkOfficialAddress = (addresses) => (value) => {
    return !addresses.some((subString) => value.toLowerCase().includes(subString));
};
const hasForbiddenChars = (value) => {
    const forbiddenCharacters = [ '[at]', '(at)', '@' ];

    return !forbiddenCharacters.some((subString) => value.toLowerCase().includes(subString));
};

const checkForAbsoluteUrl = (value) => {
    if (!value) {
        return true;
    }

    return R.or(value.startsWith('http://'), value.startsWith('https://'));
};

export const isOfficialAddress = (addresses) => checkSingle(checkOfficialAddress(addresses), errorMessages.unofficialWebsite);
export const isValidAddress = checkSingle(hasForbiddenChars, errorMessages.notValidWebsite);
export const isAbsoluteUrl = checkSingle(checkForAbsoluteUrl, errorMessages.notAbsoluteUrl);

export const websiteSchema = (forbiddenAddresses) => checkMultiple([
    isOfficialAddress(forbiddenAddresses)(),
    isValidAddress(),
    isAbsoluteUrl()
]);
