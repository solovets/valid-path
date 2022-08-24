const checkOptions = require('../helpers/check-options');

const optionsDefaults = checkOptions.optionsDefaults;

const optionsInterface = checkOptions.optionsInterface;

const expectedOptions = (args) => {
    let object = {};

    for (let k in optionsDefaults) {

        let rewriteValue = args && args.hasOwnProperty(k);

        object[k] = rewriteValue ? args[k] : optionsDefaults[k];
    }

    return object;
};

const optionsToTest = require('./testData').optionsToTest(expectedOptions);

describe(
    'Test for checkOptions helper function',
    () => {

        optionsToTest.forEach(item => {
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            it(`Test checkOptions output for ${args}`, () => {

                let expected = {};

                if (typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null && Array.isArray(item.argsToPassInTestingFunction) === false) {
                    for (let key in item.argsToPassInTestingFunction) {
                        if (optionsDefaults.hasOwnProperty(key) && optionsInterface[key](item.argsToPassInTestingFunction[key]) === true) {
                            expected[key] = item.argsToPassInTestingFunction[key];
                        }
                    }
                }

                expect(
                    checkOptions(item.argsToPassInTestingFunction)
                    )
                    .toEqual(
                        item.expected(expected)
                    );
            });
        });
    } 
)