"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EMAIL_REGEX = exports.EMAIL_REGEX = /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,30}\s*$/i;
var NUMBER_REGEX = exports.NUMBER_REGEX = /^\d+$/;
var PHONE_NUMBER_REGEX = exports.PHONE_NUMBER_REGEX = /^[+\d][\d\s]*\d$/;
var WITHOUT_NUMBER_REGEX = exports.WITHOUT_NUMBER_REGEX = /^([^0-9]*)$/;
var WITH_LETTER_REGEX = exports.WITH_LETTER_REGEX = /[a-z]/i;