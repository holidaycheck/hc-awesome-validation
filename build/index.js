'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNameSchema = exports.setupCheck = exports.hasAtLeastOneLetter = exports.isStringWithoutNumbers = exports.isEqualOrShorterThan = exports.hasLengthBetween = exports.isNumber = exports.isRequired = exports.lastNameSchema = exports.firstNameSchema = exports.commentSchema = exports.phoneNumberSchema = exports.isPhoneNumber = exports.newPasswordSchema = exports.websiteSchema = exports.isAbsoluteUrl = exports.isValidAddress = exports.isOfficialAddress = exports.isEmail = exports.emailSchema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _email = require('./email');

Object.defineProperty(exports, 'emailSchema', {
    enumerable: true,
    get: function get() {
        return _email.emailSchema;
    }
});
Object.defineProperty(exports, 'isEmail', {
    enumerable: true,
    get: function get() {
        return _email.isEmail;
    }
});

var _website = require('./website');

Object.defineProperty(exports, 'isOfficialAddress', {
    enumerable: true,
    get: function get() {
        return _website.isOfficialAddress;
    }
});
Object.defineProperty(exports, 'isValidAddress', {
    enumerable: true,
    get: function get() {
        return _website.isValidAddress;
    }
});
Object.defineProperty(exports, 'isAbsoluteUrl', {
    enumerable: true,
    get: function get() {
        return _website.isAbsoluteUrl;
    }
});
Object.defineProperty(exports, 'websiteSchema', {
    enumerable: true,
    get: function get() {
        return _website.websiteSchema;
    }
});

var _password = require('./password');

Object.defineProperty(exports, 'newPasswordSchema', {
    enumerable: true,
    get: function get() {
        return _password.newPasswordSchema;
    }
});

var _phone = require('./phone');

Object.defineProperty(exports, 'isPhoneNumber', {
    enumerable: true,
    get: function get() {
        return _phone.isPhoneNumber;
    }
});
Object.defineProperty(exports, 'phoneNumberSchema', {
    enumerable: true,
    get: function get() {
        return _phone.phoneNumberSchema;
    }
});

var _comment = require('./comment');

Object.defineProperty(exports, 'commentSchema', {
    enumerable: true,
    get: function get() {
        return _comment.commentSchema;
    }
});

var _firstName = require('./firstName');

Object.defineProperty(exports, 'firstNameSchema', {
    enumerable: true,
    get: function get() {
        return _firstName.firstNameSchema;
    }
});

var _lastName = require('./lastName');

Object.defineProperty(exports, 'lastNameSchema', {
    enumerable: true,
    get: function get() {
        return _lastName.lastNameSchema;
    }
});

var _common = require('./common');

Object.defineProperty(exports, 'isRequired', {
    enumerable: true,
    get: function get() {
        return _common.isRequired;
    }
});
Object.defineProperty(exports, 'isNumber', {
    enumerable: true,
    get: function get() {
        return _common.isNumber;
    }
});
Object.defineProperty(exports, 'hasLengthBetween', {
    enumerable: true,
    get: function get() {
        return _common.hasLengthBetween;
    }
});
Object.defineProperty(exports, 'isEqualOrShorterThan', {
    enumerable: true,
    get: function get() {
        return _common.isEqualOrShorterThan;
    }
});
Object.defineProperty(exports, 'isStringWithoutNumbers', {
    enumerable: true,
    get: function get() {
        return _common.isStringWithoutNumbers;
    }
});
Object.defineProperty(exports, 'hasAtLeastOneLetter', {
    enumerable: true,
    get: function get() {
        return _common.hasAtLeastOneLetter;
    }
});
Object.defineProperty(exports, 'setupCheck', {
    enumerable: true,
    get: function get() {
        return _common.setupCheck;
    }
});
Object.defineProperty(exports, 'createNameSchema', {
    enumerable: true,
    get: function get() {
        return _common.createNameSchema;
    }
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reduceToFieldsOnlyInSchema = function reduceToFieldsOnlyInSchema(schema, values) {
    return _ramda2.default.pipe(_ramda2.default.keys, _ramda2.default.reduce(function (acc, val) {
        return schema[val] !== undefined ? _extends({}, acc, _defineProperty({}, val, values[val])) : acc;
    }, {}));
};

var setEmptyValues = function setEmptyValues(schema, values) {
    return _ramda2.default.pipe(_ramda2.default.keys, _ramda2.default.reduce(function (acc, val) {
        return acc[val] === undefined ? _extends({}, acc, _defineProperty({}, val, '')) : acc;
    }, _extends({}, values)))(schema);
};

var trimConditionally = function trimConditionally(val) {
    return _ramda2.default.type(val) === 'String' ? _ramda2.default.trim(val) : val;
};

exports.default = function (schema) {
    return function (values, _ref) {
        var intl = _ref.intl;

        var initialValues = setEmptyValues(schema, values);

        return _ramda2.default.pipe(reduceToFieldsOnlyInSchema(schema, initialValues), _ramda2.default.map(trimConditionally), _ramda2.default.evolve(schema), _ramda2.default.reject(_ramda2.default.isNil), _ramda2.default.map(function (message) {
            return intl.formatMessage(message);
        }))(initialValues);
    };
};