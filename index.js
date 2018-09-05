var isGlob = require('is-glob'),
	_ = require('underscore.string');

module.exports = function (string, options) {

	var opts = {
		sep: '/',
		sepDuplications: false,
		disk: true
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

        if (options.hasOwnProperty('disk') && typeof options.disk === 'boolean') {
            opts.disk = options.disk;
        }
	}

	var sep = opts.sep,
        disk = new RegExp('^[A-Z]:\\' + sep),
		sepDuplications = opts.sep === '/' ? /\/{2,}/ : /\\{2,}/,
		rows;

	if (typeof string !== 'string') {
		return 'Type of provided argument is not a string';
    }

	if (_.isBlank(string)) {
		return 'Provided string is empty';
	}

	if (sepDuplications.test(string) && opts.sepDuplications === false) {
		return 'Duplicated separator';
	}

	if (disk.test(string)) {
		if (opts.disk) {
            string = string.replace(disk, '');
		} else {
			return 'Contains drive letter';
		}
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
