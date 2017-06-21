'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emailSchema = exports.isEmail = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _common = require('./common');

var _regexes = require('./regexes');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmail = exports.isEmail = (0, _common.checkSingle)(_ramda2.default.test(_regexes.EMAIL_REGEX), _errorMessages2.default.notValidEmail);

var emailSchema = exports.emailSchema = (0, _common.checkMultiple)([(0, _common.isRequired)(_errorMessages2.default.emptyEmail), isEmail()]);