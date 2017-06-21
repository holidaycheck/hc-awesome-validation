import { websiteSchema, isOfficialAddress, isValidAddress, isAbsoluteUrl } from '../website';
import errorMessages from '../errorMessages';

const forbiddenAddresses = [
    'foo-bar.com'
];

describe('websiteSchema', () => {
    it('should return an error message for website which is on forbidden address list', () => {
        const forbiddenAddress = 'foo-bar.com';
        const result = websiteSchema(forbiddenAddresses)(forbiddenAddress);

        expect(result).toEqual(errorMessages.unofficialWebsite);
    });

    it('should return an error message for website with forbidden character', () => {
        const badAddress = 'foo@bar.de';
        const result = websiteSchema(forbiddenAddresses)(badAddress);

        expect(result).toEqual(errorMessages.notValidWebsite);
    });

    it('should return an error message for website which does not start with http:// or https://', () => {
        const badAddress = 'foo-bar-baz.com';
        const result = websiteSchema(forbiddenAddresses)(badAddress);

        expect(result).toEqual(errorMessages.notAbsoluteUrl);
    });

    it('should return undefined for correct value', () => {
        const goodAddress = 'http://foo-bar-baz.com';
        const result = websiteSchema(forbiddenAddresses)(goodAddress);

        expect(result).toEqual(undefined);
    });
});

describe('isOfficialAddress', () => {
    it('should return an error message for website which is on forbidden address list', () => {
        const forbiddenAddress = 'foo-bar.com';
        const result = isOfficialAddress(forbiddenAddresses)()(forbiddenAddress);

        expect(result).toEqual(errorMessages.unofficialWebsite);
    });

    it('should return undefined when value is allowed address', () => {
        const fieldValue = 'foo-bar-baz.com';
        const result = isOfficialAddress(forbiddenAddresses)()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('isValidAddress', () => {
    it('should return an error message for website with forbidden character', () => {
        const badAddress = 'holid@ycheck.de';
        const result = isValidAddress()(badAddress);

        expect(result).toEqual(errorMessages.notValidWebsite);
    });

    it('should return undefined when value does NOT have forbidden character', () => {
        const fieldValue = 'foo-bar.com';
        const result = isValidAddress()(fieldValue);

        expect(result).toEqual(undefined);
    });
});

describe('isAbsoluteUrl', () => {
    it('should return an error message for website which does not start with http:// or https://', () => {
        const badAddress = 'foo-bar.com';
        const result = isAbsoluteUrl()(badAddress);

        expect(result).toEqual(errorMessages.notAbsoluteUrl);
    });

    it('should return undefined when value does have http://', () => {
        const fieldValue = 'http://foo-bar.com';
        const result = isAbsoluteUrl()(fieldValue);

        expect(result).toEqual(undefined);
    });

    it('should return undefined when value does have https://', () => {
        const fieldValue = 'https://foo-bar.com';
        const result = isAbsoluteUrl()(fieldValue);

        expect(result).toEqual(undefined);
    });

    it('should return undefined when there is no value passed', () => {
        const emptyValue = '';
        const result = isAbsoluteUrl()(emptyValue);

        expect(result).toEqual(undefined);
    });
});
