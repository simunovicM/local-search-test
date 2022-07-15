Number.prototype.rangeTo = function (intTo) {
	var intFrom = parseInt(this);
	var step = intFrom <= intTo ? 1 : -1;
	var ret = [];
	do {
		ret.push(intFrom);
		if (intFrom == intTo)
			break;
		intFrom += step;
	} while (true); // eslint-disable-line
	return ret;
}