const isGlob = require('is-glob');

const checkString = require('./helpers/check-string');
const checkOptions = require('./helpers/check-options');
const migrate = require('./helpers/migrate');
const messages = require('./helpers/messages');

module.exports = function (string, options, callback) {

	let _options;

	let result = {
		valid: true,
		error: null,
		data: {
			input: '',
			notes: [],
			sepDuplications: false,
			driveLetter: false,
			globPatterns: false,
			forbiddenWindowsNames: false,
			fobiddenWindowsChars: false,
			forbiddenUnixChars: false
		}
	};

	if (arguments.length === 2) {
        if (Object.prototype.toString.call(arguments[1]) === '[object Function]') {
            callback = arguments[1];
			_options = checkOptions(null);
        } else {
            callback = undefined;
			_options = checkOptions(options);
        }
    } else {
		_options = checkOptions(options);
    }

	const returner = (valid, msg) => {
		switch (valid) {
			case true:
				break;
			case false:
				result.valid = false;
				result.error = msg;

				if (callback) callback(result);

				break;
		}
	};

	const validString = checkString(string, _options.migrate);
	result.data.input = string;
	const originalString = string;

	if ( validString !== true ) {
		returner(false, validString);

		if (_options.migrate === true) {
			return validString;
		} else {
			return _options.simpleReturn ? result.valid : result;
		}
	}

	if (_options.migrate === true) return migrate(string, _options);

	const sep = _options.sep;
	const driveLetterRegExpSep = sep === '/' ? '\/' : '\\\\';
	const driveLetter = new RegExp(`^[a-zA-Z]:${driveLetterRegExpSep}?${driveLetterRegExpSep}`);
	const sepDuplications = _options.sep === '/' ? /\/{2,}/ : /\\{2,}/;

	if (driveLetter.test(string)) {

		let msg = messages.driveLetter(false);
		result.data.driveLetter = true;

		switch (_options.allowDriveLetter) {
			case true:
				string = string.replace(driveLetter, '');
				result.data.notes.push(msg);
				break;
			case false:
				returner(false, msg);
				return _options.simpleReturn ? result.valid : result;
		}
	}

	if (sepDuplications.test(string)) {
		
		let msg = messages.sepDuplications(false);
		result.data.sepDuplications = true;

		switch (_options.allowSepDuplications) {
			case true:
				result.data.notes.push(msg);
				break;
			case false:
				returner(false, msg);
				return _options.simpleReturn ? result.valid : result;
		}
	}

	if (isGlob(originalString)) {

		let msg = messages.containsGlob();
		result.data.globPatterns = true;

		switch (_options.allowGlobPatterns) {
			case true:
				result.data.notes.push(msg);
				break;
			case false:
				returner(false, msg);
				return _options.simpleReturn ? result.valid : result;
		}
    }

	let rows = string.split(sep);

	for (var i = 0; i < rows.length; i++) {
		
		if (/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(rows[i])) {
			
			let msg = messages.forbiddenNameInWindows(rows[i], false );
			result.data.forbiddenWindowsNames = true;

			switch (_options.allowForbiddenWindowsNames) {
				case true:
					result.data.notes.push(msg);
					break;
				case false:
					returner(false, msg);
					return _options.simpleReturn ? result.valid : result;
			}
		}

		if (_options.allowGlobPatterns === false && /[\\\/:\*\?"<>\|]/.test(rows[i])) {
			
			let msg = messages.forbiddenCharInWindows(rows[i], false);
			result.data.fobiddenWindowsChars = true;

			switch (_options.allowFobiddenWindowsChars) {
				case true:
					result.data.notes.push(msg);
					break;
				case false:
					returner(false, msg);
					return _options.simpleReturn ? result.valid : result;
			}
		}

		if ( /^((?!\0).)*$/.test(rows[i]) === false || (sep === '\\' && /\//.test(rows[i])) ) {

			let msg = messages.forbiddenCharInUnix(rows[i]);
			result.data.forbiddenUnixChars = true;

			switch (_options.allowForbiddenUnixChars) {
				case true:
					result.data.notes.push(msg);
					break;
				case false:
					returner(false, msg);
					return _options.simpleReturn ? result.valid : result;
			}
		}

	}

    return _options.simpleReturn ? result.valid : result;
};
