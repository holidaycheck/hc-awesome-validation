'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.phoneNumberSchema = exports.isPhoneNumber = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _regexes = require('./regexes');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPhoneNumber = exports.isPhoneNumber = (0, _common.checkSingle)(_ramda2.default.test(_regexes.PHONE_NUMBER_REGEX), _errorMessages2.default.notValidPhoneNumber);

var phoneNumberSchema = exports.phoneNumberSchema = (0, _common.checkMultiple)([(0, _common.isRequired)(_errorMessages2.default.emptyPhoneNumber), isPhoneNumber()]);