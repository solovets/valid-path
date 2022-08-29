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
                    ]
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
                    notes: []
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
                    ]
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
                    notes: []
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    ]
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
                    notes: []
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
                    notes: []
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
                    ]
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
                    ]
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

module.exports.migrateOptionsData = () => {

    return [
        {
            argsToPassInTestingFunction: {
                migrate: false,
                simpleReturn: false,
                sep: '/',
                sepDuplications: false,
                allowSepDuplications: true,
                disk: true,
                allowGlobPatterns: false,
                allowDriveLetter: false,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: {
                migrate: false,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: true,
                allowGlobPatterns: false,
                allowDriveLetter: false,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                sepDuplications: false,
                disk: true,
                allowGlobPatterns: false,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: false,
                allowGlobPatterns: false,
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                sepDuplications: false,
                allowSepDuplications: true,
                allowGlobPatterns: false,
                disk: true,
                allowDriveLetter: false,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: true,
                allowGlobPatterns: false,
                allowDriveLetter: false,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                sepDuplications: true,
                allowSepDuplications: false,
                allowGlobPatterns: false,
                disk: false,
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: false,
                allowGlobPatterns: false,
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                sepDuplications: [],
                allowSepDuplications: false,
                allowGlobPatterns: false,
                disk: {},
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            },
            expected: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: false,
                allowGlobPatterns: false,
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
        {
            argsToPassInTestingFunction: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                sepDuplications: true,
                allowSepDuplications: [],
                allowGlobPatterns: false,
                disk: false,
                allowDriveLetter: {},
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }, 
            expected: {
                migrate: true,
                simpleReturn: false,
                sep: '/',
                allowSepDuplications: false,
                allowGlobPatterns: false,
                allowDriveLetter: true,
                allowForbiddenWindowsNames: true,
                allowFobiddenWindowsChars: true,
                allowForbiddenUnixChars: true,
            }
        },
    ]
};

module.exports.migrateData = () => {

    return [
        {
            argsToPassInTestingFunction: {
                string: 'C://a/b/c',
                options: {
                    migrate: true
                }
            },
            expected: true
        },
        {
            argsToPassInTestingFunction: {
                string: 'C:/a/b/c',
                options: {
                    migrate: true
                }
            },
            expected: true
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/b/c',
                options: {
                    migrate: true,
                    disk: false
                }
            },
            expected: 'Contains drive letter'
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a//b/c',
                options: {
                    migrate: true,
                    sepDuplications: true
                }
            },
            expected: true
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a//b/c',
                options: {
                    migrate: true
                }
            },
            expected: 'Duplicated separator'
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/lpt7/c',
                options: {
                    migrate: true
                }
            },
            expected: 'Forbidden file or folder name'
        },
        {
            argsToPassInTestingFunction: {
                string: 'C://a/*/c',
                options: {
                    migrate: true
                }
            },
            expected: 'Forbidden characters'
        },
    ];
};