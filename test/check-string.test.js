const checkString = require('../helpers/check-string');

const stringsToTest = require('./testData').stringsToTest();

describe(
    'Test for checkString helper function',
    () => {

        stringsToTest.forEach(item => {
            
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            
            it(`Test checkString output for ${args}`, () => {

                expect(
                    checkString(item.argsToPassInTestingFunction)
                    )
                    .toEqual(
                        item.expected
                    );
            });
        });
    } 
)