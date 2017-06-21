'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newPasswordSchema = undefined;

var _predicates = require('./predicates');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newPasswordSchema = exports.newPasswordSchema = (0, _common.checkMultiple)([(0, _common.isRequired)(_errorMessages2.default.emptyPassword), (0, _common.checkSingle)(_predicates.hasMinLength8, _errorMessages2.default.tooWeakPassword)(), (0, _common.checkSingle)(_predicates.hasLowerLetter, _errorMessages2.default.tooWeakPassword)(), (0, _common.checkSingle)(_predicates.hasUpperLetter, _errorMessages2.default.tooWeakPassword)(), (0, _common.checkSingle)(_predicates.hasNumber, _errorMessages2.default.tooWeakPassword)()]);