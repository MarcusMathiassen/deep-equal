import { testSuites } from './testSuites.js';
import { deepEqual } from './react.js'
import ava from 'ava'

try {
testSuites.forEach(suite => {
    suite.tests.forEach((t, i) => {
        ava(`[${suite.description} ${i}] ${t.description}`, test => {
            test.is(deepEqual(t.value1, t.value2), t.deepEqual)
        })
    })
})
}
catch(err) {
    console.log(err)
}