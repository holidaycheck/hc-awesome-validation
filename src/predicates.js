import R from 'ramda';

export const hasMinLength8 = R.compose(R.flip(R.gte)(8), R.length);
export const hasLowerLetter = R.test(/[a-z]/);
export const hasUpperLetter = R.test(/[A-Z]/);
export const hasNumber = R.test(/[0-9]/);

export const isNotEmpty = R.complement(R.isEmpty);
export const isNonEmptyOfType = (t, transform) => R.allPass([ R.is(t), R.pipe(transform, isNotEmpty) ]);

export const isNonEmptyTrimmedString = isNonEmptyOfType(String, R.trim);
export const hasLengthBetween = R.curry((minLength, maxLength, string) => {
    return string.length >= minLength && string.length <= maxLength;
});

export const isEqualOrShorterThan = R.curry((length, string) => {
    return string ? string.length <= length : true;
});

export default {
    hasMinLength8,
    hasLowerLetter,
    hasUpperLetter,
    hasLengthBetween,
    isEqualOrShorterThan,
    hasNumber,
    isNotEmpty,
    isNonEmptyOfType,
    isNonEmptyTrimmedString
};
