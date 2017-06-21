Common validator for all redux-from forms with react-intl messages.

# Validator
One can import it like this:
`import validate from 'path-to-lib/validation`;

# Imports of validation methods
Validation methods and schemas can be imported like this:

`import validate, { isRequired, isEmail } from 'path-to-lib/validation`;

or (for convenience):

`import validate, { isRequired } from 'path-to-lib/validation;`

`import { isEmail } from 'path-to-lib/validation/email;`

there is also possibility to import route for common validator methods:

`import validate, { isRequired, isNumber } from 'path-to-lib/validation/common`;

# Validation methods list:
* isEmail
* isOfficialAddress
* isValidAddress
* isAbsoluteUrl
* isPhoneNumber
* isRequired
* isNumber
* hasLengthBetween
* isEqualOrShorterThan
* isStringWithoutNumbers
* hasAtLeastOneLetter

# Schemas list with validations they contain:
* **emailSchema**:
  * isRequired,
  * isEmail
* **websiteSchema**
  * isOfficialAddress,
  * isValidAddress,
  * isAbsoluteUrl
* **newPasswordSchema**
  * isRequired,
  * specific for this schema validations: 
    * minimum of 8 characters,
    * at least one lower case letter,
    * at least one upper case letter,
    * at least one number
* **phoneNumberSchema**
  * isRequired,
  * isPhoneNumber
* **commentSchema**
  * isRequired,
  * hasAtLeastOneLetter
* **firstNameSchema**
  * isRequired,
  * hasLengthBetween with passed range,
  * isStringWithoutNumbers
* **lastNameSchema**
  * same as firstNameSchema
