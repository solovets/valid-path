module.exports.checkOptionsData = (expectedOptions) => {
    
    return [
        {
            argsToPassInTestingFunction: null,
            expected: expectedOptions
        },
        {
            argsToPassInTestingFunction: undefined,
            expected: expectedOptions
        },
        {
            argsToPassInTestingFunction: {
                migrate: null,
                simpleReturn: {},
                sep: '~',
                allowSepDuplications: /^[A-Za-z0-9]*$/,
                allowDriveLetter: 'no',
                allowForbiddenWindowsNames: 'false',
                allowFobiddenWindowsChars: null,
                allowForbiddenUnixChars: 1,
                unknownKey: 'anyValue',
            },
            expected: expectedOptions
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: true,
                sep: '\\',
                allowSepDuplications: true,
                allowDriveLetter: false,
                allowGlobPatterns: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: expectedOptions
        },
        {
            argsToPassInTestingFunction: {
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: expectedOptions
        }
    ];

};

module.exports.checkStringData = () => {
    return [
        {
            argsToPassInTestingFunction: null,
            expected: '"string" argument must be of type "string", got "object" for "null"',
        },
        {
            argsToPassInTestingFunction: undefined,
            expected: '"string" argument must be of type "string", got "undefined" for "undefined"',
        },
        {
            argsToPassInTestingFunction: '',
            expected: 'Provided "string" argument is an empty string',
        },
        {
            argsToPassInTestingFunction: 'a/b/c',
            expected: true,
        }
    ];
};

let result = {
    valid: true,
    error: null,
    data: {
        input: '',
        notes: []
    }
};

module.exports.indexData = () => {

    return [
        {
            argsToPassInTestingFunction: {
                string: 'C://a/b/c',
                options: {}
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'C://a/b/c',
                    notes: [
                        'Input string contains drive letter'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/b/c',
                options: {
                    allowDriveLetter: false
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains drive letter',
                data: {
                    input: 'C://a/b/c',
                    notes: [],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:\\\\a\\b\\c',
                options: {
                    sep: '\\'
                }
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'C:\\\\a\\b\\c',
                    notes: [
                        'Input string contains drive letter'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:a\\b\\c',
                options: {
                    sep: '\\'
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains characters, that are forbidden in Windows (C:a)',
                data: {
                    input: 'C:a\\b\\c',
                    notes: [],
                    sepDuplications: false,
                    driveLetter: false,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: true,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:\\\\a/b/c',
                options: {
                    sep: '\\'
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains characters, that are forbidden in Windows (a/b/c)',
                data: {
                    input: 'C:\\\\a/b/c',
                    notes: [
                        'Input string contains drive letter'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: true,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:\\\\a\\nul\\c',
                options: {
                    sep: '\\'
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains file or folder name, that is forbidden in Windows  (nul)',
                data: {
                    input: 'C:\\\\a\\nul\\c',
                    notes: [
                        'Input string contains drive letter'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: true,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/**/*.js',
                options: {}
            },
            expected: {
                valid: false,
                error: 'Input string contains Glob pattern',
                data: {
                    input: 'C://a/**/*.js',
                    notes: [
                        'Input string contains drive letter'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: true,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/**/*.js',
                options: {
                    allowGlobPatterns: true
                }
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'C://a/**/*.js',
                    notes: [
                        'Input string contains drive letter',
                        'Input string contains Glob pattern'
                    ],
                    sepDuplications: false,
                    driveLetter: true,
                    globPatterns: true,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'con/**/*.js',
                options: {
                    allowGlobPatterns: true
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains file or folder name, that is forbidden in Windows  (con)',
                data: {
                    input: 'con/**/*.js',
                    notes: [
                        'Input string contains Glob pattern'
                    ],
                    sepDuplications: false,
                    driveLetter: false,
                    globPatterns: true,
                    forbiddenWindowsNames: true,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:\\\\a\\nul\\\\c',
                options: {
                    sep: '\\',
                    allowForbiddenWindowsNames: true,
                    allowSepDuplications: true
                }
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'C:\\\\a\\nul\\\\c',
                    notes: [
                        'Input string contains drive letter',
                        'Input string contains duplicated separator',
                        'Input string contains file or folder name, that is forbidden in Windows  (nul)'
                    ],
                    sepDuplications: true,
                    driveLetter: true,
                    globPatterns: false,
                    forbiddenWindowsNames: true,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'a/b/c',
                options: {}
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'a/b/c',
                    notes: [],
                    sepDuplications: false,
                    driveLetter: false,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'a/b//c',
                options: {
                    allowSepDuplications: false
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains duplicated separator',
                data: {
                    input: 'a/b//c',
                    notes: [],
                    sepDuplications: true,
                    driveLetter: false,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'a/b//c',
                options: {
                    allowSepDuplications: true
                }
            },
            expected: {
                valid: true,
                error: null,
                data: {
                    input: 'a/b//c',
                    notes: [
                        'Input string contains duplicated separator'
                    ],
                    sepDuplications: true,
                    driveLetter: false,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: false,
                    forbiddenUnixChars: false
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'a\\b/c',
                options: {
                    sep: '\\',
                    allowFobiddenWindowsChars: true
                }
            },
            expected: {
                valid: false,
                error: 'Input string contains characters, that are forbidden in Unix (b/c)',
                data: {
                    input: 'a\\b/c',
                    notes: [
                        'Input string contains characters, that are forbidden in Windows (b/c)'
                    ],
                    sepDuplications: false,
                    driveLetter: false,
                    globPatterns: false,
                    forbiddenWindowsNames: false,
                    fobiddenWindowsChars: true,
                    forbiddenUnixChars: true
                }
            }
        },
        {
            argsToPassInTestingFunction: {
                string: 'a/b//c',
                options: {
                    simpleReturn: true,
                    allowSepDuplications: true
                }
            },
            expected: true
        },
        {
            argsToPassInTestingFunction: {
                string: 'a\\b/c',
                options: {
                    simpleReturn: true,
                    sep: '\\',
                    allowFobiddenWindowsChars: true
                }
            },
            expected: false
        },
    ];
};
