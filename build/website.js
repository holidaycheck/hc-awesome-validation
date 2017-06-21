'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.websiteSchema = exports.isAbsoluteUrl = exports.isValidAddress = exports.isOfficialAddress = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _common = require('./common');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkOfficialAddress = function checkOfficialAddress(addresses) {
    return function (value) {
        return !addresses.some(function (subString) {
            return value.toLowerCase().includes(subString);
        });
    };
};
var hasForbiddenChars = function hasForbiddenChars(value) {
    var forbiddenCharacters = ['[at]', '(at)', '@'];

    return !forbiddenCharacters.some(function (subString) {
        return value.toLowerCase().includes(subString);
    });
};

var checkForAbsoluteUrl = function checkForAbsoluteUrl(value) {
    if (!value) {
        return true;
    }

    return _ramda2.default.or(value.startsWith('http://'), value.startsWith('https://'));
};

var isOfficialAddress = exports.isOfficialAddress = function isOfficialAddress(addresses) {
    return (0, _common.checkSingle)(checkOfficialAddress(addresses), _errorMessages2.default.unofficialWebsite);
};
var isValidAddress = exports.isValidAddress = (0, _common.checkSingle)(hasForbiddenChars, _errorMessages2.default.notValidWebsite);
var isAbsoluteUrl = exports.isAbsoluteUrl = (0, _common.checkSingle)(checkForAbsoluteUrl, _errorMessages2.default.notAbsoluteUrl);

var websiteSchema = exports.websiteSchema = function websiteSchema(forbiddenAddresses) {
    return (0, _common.checkMultiple)([isOfficialAddress(forbiddenAddresses)(), isValidAddress(), isAbsoluteUrl()]);
};