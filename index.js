var path = require('path'),
    isGlob = require('is-glob'),
	_ = require('underscore.string');

module.exports = function (string, options) {

	var opts = {
		sep: '/',
		sepDuplications: false
	};

	if (typeof options === 'object') {
		if (options.hasOwnProperty('sep') && typeof options.sep === 'string') {
			if (options.sep === '/' || options.sep === '\\') {
				opts.sep = options.sep;
			}
		}

		if (options.hasOwnProperty('sepDuplications') && typeof options.sepDuplications === 'boolean') {
			opts.sepDuplications = options.sepDuplications;
		}
	}

	var sep = opts.sep,
        disk = new RegExp('^[A-Z]:\\' + sep),
		rows;

	if (typeof string !== 'string') {
		return 'Type of provided argument is not a string';
    }

	if (_.isBlank(string)) {
		return 'Provided string is empty';
	}
console.log(opts.sep, string, opts.sepDuplications);
	if (new RegExp(sep + '{2,}').test(string) && opts.sepDuplications === false) {
		return 'Duplicated separator';
	}

	if (disk.test(string)) {
		string = string.replace(disk, '');
    }

	if (isGlob(string) && opts.glob === false) {
		return 'Contains Glob pattern';
    }

	rows = string.split(sep);

	for (var i = 0; i < rows.length; i++) {
		if (/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(rows[i])) {
			return 'Forbidden file or folder name';
		}

		if (/[\\\/:\*\?"<>\|]/.test(rows[i])) {
			return 'Forbidden characters';
		}
	}

    return true;
};
