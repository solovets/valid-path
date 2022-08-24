const optionsDefaults = {
    migrate: false,
    disk: true,

    simpleReturn: false,
    sep: '/',
    allowSepDuplications: false,
    allowDriveLetter: true,
    allowGlobPatterns: false,
    allowForbiddenWindowsNames: false,
    allowFobiddenWindowsChars: false,
    allowForbiddenUnixChars: false,
};

const optionsInterface = {
    migrate: (input) => typeof input === 'boolean',
    disk: (input) => typeof input === 'boolean',

    simpleReturn: (input) => typeof input === 'boolean',
    sep: (input) => input === '/' || input === '\\',
    allowSepDuplications: (input) => typeof input === 'boolean',
    allowDriveLetter: (input) => typeof input === 'boolean',
    allowGlobPatterns: (input) => typeof input === 'boolean',
    allowForbiddenWindowsNames: (input) => typeof input === 'boolean',
    allowFobiddenWindowsChars: (input) => typeof input === 'boolean',
    allowForbiddenUnixChars: (input) => typeof input === 'boolean',
};

module.exports = function(options) {

    let checkedOptions = {};

    if (typeof options === 'object' && Array.isArray(options) === false && options !== null) {
        for (let key in options) {
            if (optionsDefaults.hasOwnProperty(key) === true) {
                switch (optionsInterface[key](options[key])) {
                    case true:
                        checkedOptions[key] = options[key];
                        break;
                    case false:
                        checkedOptions[key] = optionsDefaults[key];
                        console.warn(`[valid-path] Unexpected value type for "${key}" option.\nSet to defalut value "${optionsDefaults[key]}"`);
                        break;
                }
            } else {
                console.warn(`[valid-path] Unknown option "${key}"`);
            }
        }

        for (let key in optionsDefaults) {
            if (checkedOptions.hasOwnProperty(key) === false) checkedOptions[key] = optionsDefaults[key];
        }

    } else if (options === null || options === undefined) {
        checkedOptions = optionsDefaults;
    }
    else {
        checkedOptions = optionsDefaults;
        console.warn(`[valid-path] Unexpected type of "options" argument. Expected "object", got ${typeof options}. Set to default value "${JSON.stringify(optionsDefaults)}"`);
    }

    return checkedOptions;

}

module.exports.optionsDefaults = optionsDefaults;

module.exports.optionsInterface = optionsInterface;

