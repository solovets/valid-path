const checkOptions = require('../helpers/check-options');
const migrateOptions = require('./testData').migrateOptionsData();
const migrate = require('./testData').migrateData();
const validPath = require('../index');

describe(
    'Test for checkOptions helper function with option "migrate" set to "true"',
    () => {

        migrateOptions.forEach(item => {
            
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            
            it(`Test checkOptions (migrate) output for ${args}`, () => {

                expect(
                    checkOptions(item.argsToPassInTestingFunction)
                    )
                    .toEqual(
                        item.expected
                    );
            });
        });
    } 
);

describe(
    'Test for vaidPath function with option "migrate" set to "true"',
    () => {

        migrate.forEach(item => {
            
            let args = typeof item.argsToPassInTestingFunction === 'object' && item.argsToPassInTestingFunction !== null ? JSON.stringify(item.argsToPassInTestingFunction) : item.argsToPassInTestingFunction;
            
            it(`Test validPath (migrate) output for ${args}`, () => {

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