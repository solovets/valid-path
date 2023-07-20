module.exports = {
    notString: (input) => {
        let result = `"string" argument must be of type "string", got "${typeof input}" for "${input}"`;

        return result;
    },
    emptyString: () => {
        let result = 'Provided "string" argument is an empty string';

        return result;
    },
    driveLetter: () => {
        let result = 'Input string contains drive letter';

        return result;
    },
    sepDuplications: () => {
        let result = 'Input string contains duplicated separator';

        return result;
    },
    containsGlob: () => {
        return 'Input string contains Glob pattern';
    },
    forbiddenNameInWindows: (input) => {
        let result = `Input string contains file or folder name, that is forbidden in Windows  (${input})`;

        return result;
    },
    forbiddenCharInWindows: (input) => {
        let result = `Input string contains characters, that are forbidden in Windows (${input})`;

        return result;
    },
    forbiddenCharInUnix: (input) => {
        return `Input string contains characters, that are forbidden in Unix (${input})`;
    }
};