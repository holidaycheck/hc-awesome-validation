'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commentSchema = undefined;

var _common = require('./common');

var _errorMessages = require('./errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentSchema = exports.commentSchema = (0, _common.checkMultiple)([(0, _common.isRequired)(_errorMessages2.default.wrongComment), (0, _common.hasAtLeastOneLetter)(_errorMessages2.default.wrongComment)]);