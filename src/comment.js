import { checkMultiple, isRequired, hasAtLeastOneLetter } from './common';
import errorMessages from './errorMessages';

export const commentSchema = checkMultiple([
    isRequired(errorMessages.wrongComment),
    hasAtLeastOneLetter(errorMessages.wrongComment)
]);
