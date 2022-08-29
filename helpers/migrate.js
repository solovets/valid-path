const path = require('path');
const isGlob = require('is-glob');

module.exports = function (string, options) {

	const originalString = string;

    const sep = options.sep;
	const driveLetterRegExpSep = sep === '/' ? '\/' : '\\\\';
	const driveLetter = new RegExp(`^[a-zA-Z]:${driveLetterRegExpSep}?${driveLetterRegExpSep}`);
	const sepDuplications = sep === '/' ? /\/{2,}/ : /\\{2,}/;
	
	if (driveLetter.test(string)) {
		if (options.allowDriveLetter === true) {
            string = string.replace(driveLetter, '');
		} else {
			return 'Contains drive letter';
		}
    }

    if (sepDuplications.test(string) && options.allowSepDuplications === false) {
		return 'Duplicated separator';
	}

	const rows = string.split(sep);

	for (var i = 0; i < rows.length; i++) {
		if (/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(rows[i])) {
			return 'Forbidden file or folder name';
		}

		if (/[\\\/:\*\?"<>\|]/.test(rows[i])) {
			return 'Forbidden characters';
		}
	}

    return true;
}