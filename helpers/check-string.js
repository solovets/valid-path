const messages = require('./messages');

module.exports = function(input, migrate) {

    if (typeof input !== 'string') {
		return messages.notString(input, migrate);
    }

	if (/^\s*$/.test(input)) {
		return messages.emptyString(input, migrate);
	}

    return true;

};