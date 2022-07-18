'use strict';
const testSuites = require('./testSuites.js')
const { deepEqual } = require('../index.js')
testSuites.forEach(suite => {
    describe(suite.description, () => {
        suite.tests.forEach(t => {
            test(t.description, () => {
                expect(deepEqual(t.value1, t.value2)).toBe(t.deepEqual)
            })
        })
    })
})