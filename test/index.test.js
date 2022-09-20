const validPath = require('../index');
const optionsToTest = require('./testData').indexData();
const stringsToTest = require('./testData').checkStringData();

let _return = {
    valid: true,
    error: null,
    data: {
        input: '',
        notes: []
    }
};

describe(
    'Test for vaidPath function: check call of function with single argument',
    () => {

        stringsToTest.forEach(item => {
            
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            
            it(`Test validPath output for ${args}`, () => {

                expect(
                    validPath(item.argsToPassInTestingFunction)
                    )
                    .toEqual(
                        {
                            valid: item.expected === true,
                            error: item.expected === true ? null : item.expected,
                            data: {
                                input: item.argsToPassInTestingFunction,
                                notes: [],
                                sepDuplications: false,
                                driveLetter: false,
                                globPatterns: false,
                                forbiddenWindowsNames: false,
                                fobiddenWindowsChars: false,
                                forbiddenUnixChars: false
                            }
                        }
                    );
            });
        });
    } 
);

describe(
    'Test for vaidPath function: check call of function with ifferent options',
    () => {

        optionsToTest.forEach(item => {
            
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            
            it(`Test validPath output for ${args}`, () => {

                expect(
                    validPath(item.argsToPassInTestingFunction.string, item.argsToPassInTestingFunction.options)
                    )
                    .toEqual(
                        item.expected
                    );
            });
        });
    } 
);