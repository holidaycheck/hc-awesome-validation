'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNameSchema = exports.hasAtLeastOneLetter = exports.isStringWithoutNumbers = exports.isEqualOrShorterThan = exports.hasLengthBetween = exports.isNumber = exports.isRequired = exports.checkSingle = exports.setupCheck = exports.checkMultiple = exports.check = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _predicates = require('./predicates');

var _regexes = require('./regexes');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var check = exports.check = _ramda2.default.curry(function (predicate, msg, val) {
    return predicate(val) ? undefined : msg;
});

var checkMultiple = exports.checkMultiple = _ramda2.default.curry(function (predicates, value) {
    var firstFailedPredicate = _ramda2.default.find(function (predicate) {
        return Boolean(predicate(value));
    }, predicates);

    return firstFailedPredicate ? firstFailedPredicate(value) : undefined;
});

var setupCheck = exports.setupCheck = function setupCheck(checkCallback) {
    return function (predicate, defaultMessage) {
        return function (customMessage) {
            return checkCallback(predicate, customMessage || defaultMessage);
        };
    };
};

var checkSingle = exports.checkSingle = setupCheck(check);

var isRequired = exports.isRequired = checkSingle(_predicates.isNonEmptyTrimmedString, _errorMessages2.default.emptyField);
var isNumber = exports.isNumber = checkSingle(_ramda2.default.test(_regexes.NUMBER_REGEX), _errorMessages2.default.numberField);

var hasLengthBetween = exports.hasLengthBetween = function hasLengthBetween(from, to) {
    return checkSingle((0, _predicates.hasLengthBetween)(from, to), _errorMessages2.default.fieldWrongLength);
};
var isEqualOrShorterThan = exports.isEqualOrShorterThan = function isEqualOrShorterThan(length) {
    return checkSingle((0, _predicates.isEqualOrShorterThan)(length), _errorMessages2.default.toShortFieldValue);
};
var isStringWithoutNumbers = exports.isStringWithoutNumbers = checkSingle(_ramda2.default.test(_regexes.WITHOUT_NUMBER_REGEX), _errorMessages2.default.fieldWithNumbers);
var hasAtLeastOneLetter = exports.hasAtLeastOneLetter = checkSingle(_ramda2.default.test(_regexes.WITH_LETTER_REGEX), _errorMessages2.default.fieldWithNumbersOnly);

var createNameSchema = exports.createNameSchema = function createNameSchema(fieldName) {
    return checkMultiple([isRequired(_errorMessages2.default[fieldName + 'Empty'] || ''), hasLengthBetween(2, 50)(_errorMessages2.default[fieldName + 'WrongLength'] || ''), isStringWithoutNumbers(_errorMessages2.default[fieldName + 'WithNumbers'] || '')]);
};