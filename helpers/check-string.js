module.exports = function(input) {

    if (typeof input !== 'string') {
		return `"string" argument must be of type "string", got "${typeof input}" for "${input}"`;
    }

	if (/^\s*$/.test(input)) {
		return `Provided "string" argument is an empty string`;
	}

    return true;

};