const messages = require('./messages');

module.exports = function(input) {

    if (typeof input !== 'string') {
		return messages.notString(input);
    }

	if (/^\s*$/.test(input)) {
		return messages.emptyString(input);
	}

    return true;

};