import { isFunction } from './common';

export const getAllParents = function getAllParents(vm) {
	return vm.$parent ? [vm, ...getAllParents(vm.$parent)] : [vm];
};
export const getParentForm = (vm) => getAllParents(vm.$parent).first(f => f.isValidationForm && f.$data.$modelValidators)

export const getAllChildren = function (vm) {
	function req(vue) {
		var ret = [vue];
		if (vue.$children && vue.$children.length > 0) {
			vue.$children.forEach(function (f) {
				ret.pushMany(req(f));
			});
		}
		return ret;
	}
	return req(vm);
}

export const setValidationItem = (vm) => getParentForm(vm) && getParentForm(vm).$data.$modelValidators.push(vm);
export const removeValidationItem = (vm) => getParentForm(vm) && getParentForm(vm).$data.$modelValidators.remove(vm);

export const propToBool = (prop) => prop === "" || prop;
export const propToFnc = (prop) => isFunction(prop) ? prop : (f => prop ? f[prop] : f);
export const valueToFnc = (value) => isFunction(value) ? value : (() => value);

export const getAllValidationChildren = (el) => {
	return getAllChildren(el)
		.filter(f => !f._inactive && f.checkIsValid);
}

export const checkFormIsValid = (el) => {
	var formNotValid = false;
	getAllValidationChildren(el)
		.forEach(f => {
			f.checkIsValid();
			if (!f.isValid) formNotValid = true;
		});
	return !formNotValid;
};
