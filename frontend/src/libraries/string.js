import { isNullOrEmpty } from './common';

if (!String.prototype.isNullOrEmpty) {
	String.prototype.isNullOrEmpty = function () {
		return isNullOrEmpty(this);
	}
}

if (!String.prototype.capitalize) {
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
	}
}

if (!String.prototype.splitByUpperCase) {
	String.prototype.splitByUpperCase = function () {
		return this.match(/((^[a-z]*)|([A-Z][a-z]*))/g);
	}
}

if (!String.prototype.camelCase) {
	String.prototype.camelCase = function () {
		var uperStart = (this.match(/^[A-Z]+/g) || ['']).first();
		return uperStart.toLowerCase() + this.substring(uperStart.length);
	}
}

if (!String.prototype.format) {
	String.prototype.format = function () {
		"use strict";
		var str = this.toString();
		if (arguments.length) {
			var t = typeof arguments[0];
			var key;
			var args = ("string" === t || "number" === t) ?
				Array.prototype.slice.call(arguments)
				: arguments[0];

			for (key in args) {
				str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
			}
		}
		return str;
	}
}

String.prototype.replaceAll = String.prototype.replaceAll ||
	function (fromString, toString) {
		return this.replace(new RegExp(escapeRegExp(fromString), 'g'), toString);
	};
String.prototype.replaceWords = String.prototype.replaceWords ||
	function (fromString, toString) {
		return this.replace(new RegExp('\\b' + escapeRegExp(fromString) + '\\b', 'g'), toString);
	};
function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}

String.prototype.matchAll = String.prototype.matchAll ||
	function (regexp) {
		var str = this;
		var source = regexp.source;
		if (regexp.ignoreCase) source = source.toLowerCase();

		var ret = [];
		do {
			var match = str.toLowerCase().match(source);
			if (!match) break;
			match['0'] = str.substring(match.index, match['0'].length);
			ret.push({ ...match });
			str = str.substring(match.index + match['0'].length);
		} while (true); // eslint-disable-line
		return ret;
	};

export const stringSorter = (a, b) => {
	var arrA = Array.from(a || '');
	var arrB = Array.from(b || '');
	for (var i = 0; i < arrA.length; i++) {
		var ch1 = arrA[i];
		var ch2 = arrB.length > i ? arrB[i] : '';
		var ch1Low = ch1.toLowerCase();
		var ch2Low = ch2.toLowerCase();
		if (ch1Low > ch2Low) return true;
		if (ch1Low < ch2Low) return false;
		if (ch1 > ch2) return true;
		if (ch1 < ch2) return false;
	}
	if (arrB.length > arrA.length)
		return false;
}

export const parseToFloat = (str) => parseFloat(str.replace(',', '.'));

export const splitSentance = (sentance, searchWord) => {
	if (!sentance) return [];
	var replacers = [
		{ from: '\\', to: '\\\\' },
		{ from: '(', to: '\\(' },
		{ from: ')', to: '\\)' },
	];
	var regexp = RegExp(replacers.reduce((acc, f) => acc.replaceAll(f.from, f.to), searchWord), 'gi');
	var len = searchWord.length;
	var spls = [0, ...Array.from(sentance.matchAll(regexp)).mapMany(f => [f.index, f.index + len]), sentance.length];
	return spls.map((f, ind) => ({
		word: sentance.substring(f, spls[ind + 1]),
		isMatch: ind % 2 === 1,
	})).filter(f => f.word);
};

var canvas = document.createElement("canvas");
export const getTextWidth = (text, font) => {
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
};

export const truncate = length => str => (str || '').length > length ? str.substring(0, length - 3) + '...' : str;