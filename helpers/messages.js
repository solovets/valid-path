module.exports = {
    notString: (input, oldVariant) => {
        let result = `"string" argument must be of type "string", got "${typeof input}" for "${input}"`;

        if (oldVariant === true) result = 'Type of provided argument is not a string';

        return result;
    },
    emptyString: (oldVariant) => {
        let result = 'Provided "string" argument is an empty string';

        if (oldVariant === true) result = 'Provided string is empty';

        return result;
    },
    driveLetter: (oldVariant) => {
        let result = 'Input string contains drive letter';

        if (oldVariant) result = 'Contains drive letter';

        return result;
    },
    sepDuplications: (oldVariant) => {
        let result = 'Input string contains duplicated separator';

        if (oldVariant === true) result = 'Duplicated separator';

        return result;
    },
    containsGlob: () => {
        return 'Input string contains Glob pattern';
    },
    forbiddenNameInWindows: (input, oldVariant) => {
        let result = `Input string contains file or folder name, that is forbidden in Windows  (${input})`;

        if (oldVariant) result = 'Forbidden file or folder name';

        return result;
    },
    forbiddenCharInWindows: (input, oldVariant) => {
        let result = `Input string contains characters, that are forbidden in Windows (${input})`;

        if (oldVariant) result = 'Forbidden characters';

        return result;
    },
    forbiddenCharInUnix: (input) => {
        return `Input string contains characters, that are forbidden in Unix (${input})`;
    }
};