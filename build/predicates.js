'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEqualOrShorterThan = exports.hasLengthBetween = exports.isNonEmptyTrimmedString = exports.isNonEmptyOfType = exports.isNotEmpty = exports.hasNumber = exports.hasUpperLetter = exports.hasLowerLetter = exports.hasMinLength8 = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasMinLength8 = exports.hasMinLength8 = _ramda2.default.compose(_ramda2.default.flip(_ramda2.default.gte)(8), _ramda2.default.length);
var hasLowerLetter = exports.hasLowerLetter = _ramda2.default.test(/[a-z]/);
var hasUpperLetter = exports.hasUpperLetter = _ramda2.default.test(/[A-Z]/);
var hasNumber = exports.hasNumber = _ramda2.default.test(/[0-9]/);

var isNotEmpty = exports.isNotEmpty = _ramda2.default.complement(_ramda2.default.isEmpty);
var isNonEmptyOfType = exports.isNonEmptyOfType = function isNonEmptyOfType(t, transform) {
    return _ramda2.default.allPass([_ramda2.default.is(t), _ramda2.default.pipe(transform, isNotEmpty)]);
};

var isNonEmptyTrimmedString = exports.isNonEmptyTrimmedString = isNonEmptyOfType(String, _ramda2.default.trim);
var hasLengthBetween = exports.hasLengthBetween = _ramda2.default.curry(function (minLength, maxLength, string) {
    return string.length >= minLength && string.length <= maxLength;
});

var isEqualOrShorterThan = exports.isEqualOrShorterThan = _ramda2.default.curry(function (length, string) {
    return string ? string.length <= length : true;
});

exports.default = {
    hasMinLength8: hasMinLength8,
    hasLowerLetter: hasLowerLetter,
    hasUpperLetter: hasUpperLetter,
    hasLengthBetween: hasLengthBetween,
    isEqualOrShorterThan: isEqualOrShorterThan,
    hasNumber: hasNumber,
    isNotEmpty: isNotEmpty,
    isNonEmptyOfType: isNonEmptyOfType,
    isNonEmptyTrimmedString: isNonEmptyTrimmedString
};