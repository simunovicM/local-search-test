import { isNullOrEmpty, isString, propToBool } from './common';

export const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico'];
export const documentTypes = ['.pdf', '.xml', '.xls', '.xlsx', '.txt', '.doc', '.docx', '.ppt', '.rtf'];
export const validators = {
    isRequired: ({ fnc: val => val != null && val !== '' && !(Array.isArray(val) && !val.length), message: () => 'This field is required.' }), // eslint-disable-line
    isNotEmpty: ({ fnc: val => !isNullOrEmpty(val), message: () => 'This field cannot be empty!' }),
    minLength: min => ({ fnc: val => isNullOrEmpty(val) || val.length >= min, message: () => `This field needs to heave minimum ${min} characters.` }),
    maxLength: max => ({ fnc: val => isNullOrEmpty(val) || val.length <= max, message: () => `Text field is limited to ${max} characters.` }),
    isNumber: ({ fnc: (num) => isNullOrEmpty(num) || (/^(-{0,1})(\d*)(\.{0,1})(\d*)$/.test(num) && num > -100000000000000000 && num < 100000000000000000), message: () => 'This field must be numerical.' }),
    isBetween: (min, max) => ({ fnc: num => isNullOrEmpty(num) || (num >= min && num <= max), message: () => `Number must be between ${min} and ${max}.` }),
    min: min => ({ fnc: num => isNullOrEmpty(num) || num > min, message: () => `Must be greater than ${min}.` }),
    minEqual: min => ({ fnc: num => isNullOrEmpty(num) || num >= min, message: () => `Must be greater or equal ${min}.` }),
    max: max => ({ fnc: num => isNullOrEmpty(num) || num < max, message: () => `Must be less then ${max}.` }),
    maxEqual: max => ({ fnc: num => isNullOrEmpty(num) || num <= max, message: () => `Must be less or equal ${max}.` }),
    email: ({
        fnc: (email) => {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return isNullOrEmpty(email) || re.test(String(email).toLowerCase());
        },
        message: () => 'Please provide a valid email address.'
    }),
    isFileType: types => ({ fnc: file => !file || !file.name || types.any(f => file.name.toLowerCase().endsWith(f)), message: () => `You can only upload following file types: ${types.map(f => f.substring(1)).join(', ')}` }),
    isPhone: ({
        fnc: (phone) => {
            const passRegex = /^\+?([0-9]{6,14})$/;
            return isNullOrEmpty(phone) || phone.match(passRegex);
        },
        message: () => 'Phone is not valid.'
    }),
};

export const isValid = function () {
    if (!this.touched) return true;

    if (propToBool(this.required) && !validators.isRequired.fnc(this.value))
        return false;

    var validations = this.allValidations || this.validations || this.defaultValidations;
    if (validations) {
        var find = validations.find(validation => !validation.fnc(this.value));
        return find == null; // eslint-disable-line
    }
    return true;
};
export const errorMessage = function () {
    if (!this.touched) return null;

    if (propToBool(this.required) && !validators.isRequired.fnc(this.value))
        return validators.isRequired.message();

    var validations = this.allValidations || this.validations || this.defaultValidations;
    if (validations) {
        var find = validations.find(validation => !validation.fnc(this.value));
        if (find) return isString(find.message) ? find.message : find.message(this.value);
    }
    return null;
};

export const checkIsValid = function () {
    this.touched = true;
    return this.isValid;
};