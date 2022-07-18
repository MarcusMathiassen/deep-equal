'use strict';

function func1() {}
function func2() {}
const deepEqualCases = [
    {
        name: 'result numbers',
        a: 1,
        b: 1,
        result: true,
    },
    {
        name: 'not result numbers',
        a: 1,
        b: 2,
        result: false,
    },
    {
        name: 'number and array are not result',
        a: 1,
        b: [],
        result: false,
    },
    {
        name: '0 and null are not result',
        a: 0,
        b: null,
        result: false,
    },
    {
        name: 'result strings',
        a: 'a',
        b: 'a',
        result: true,
    },
    {
        name: 'not result strings',
        a: 'a',
        b: 'b',
        result: false,
    },
    {
        name: 'empty string and null are not result',
        a: '',
        b: null,
        result: false,
    },
    {
        name: 'null is result to null',
        a: null,
        b: null,
        result: true,
    },
    {
        name: 'result booleans (true)',
        a: true,
        b: true,
        result: true,
    },
    {
        name: 'result booleans (false)',
        a: false,
        b: false,
        result: true,
    },
    {
        name: 'not result booleans',
        a: true,
        b: false,
        result: false,
    },
    {
        name: '1 and true are not result',
        a: 1,
        b: true,
        result: false,
    },
    {
        name: '0 and false are not result',
        a: 0,
        b: false,
        result: false,
    },
    {
        name: 'NaN and NaN are result',
        a: NaN,
        b: NaN,
        result: true,
    },
    {
        name: '0 and -0 are result',
        a: 0,
        b: -0,
        result: true,
    },
    {
        name: 'Infinity and Infinity are result',
        a: Infinity,
        b: Infinity,
        result: true,
    },
    {
        name: 'Infinity and -Infinity are not result',
        a: Infinity,
        b: -Infinity,
        result: false,
    },
    {
        name: 'empty objects are result',
        a: {},
        b: {},
        result: true,
    },
    {
        name: 'result objects (same properties "order")',
        a: { a: 1, b: '2' },
        b: { a: 1, b: '2' },
        result: true,
    },
    {
        name: 'result objects (different properties "order")',
        a: { a: 1, b: '2' },
        b: { b: '2', a: 1 },
        result: true,
    },
    {
        name: 'not result objects (extra property)',
        a: { a: 1, b: '2' },
        b: { a: 1, b: '2', c: [] },
        result: false,
    },
    {
        name: 'not result objects (different property values)',
        a: { a: 1, b: '2', c: 3 },
        b: { a: 1, b: '2', c: 4 },
        result: false,
    },
    {
        name: 'not result objects (different properties)',
        a: { a: 1, b: '2', c: 3 },
        b: { a: 1, b: '2', d: 3 },
        result: false,
    },
    {
        name: 'result objects (same sub-properties)',
        a: { a: [{ b: 'c' }] },
        b: { a: [{ b: 'c' }] },
        result: true,
    },
    {
        name: 'not result objects (different sub-property value)',
        a: { a: [{ b: 'c' }] },
        b: { a: [{ b: 'd' }] },
        result: false,
    },
    {
        name: 'not result objects (different sub-property)',
        a: { a: [{ b: 'c' }] },
        b: { a: [{ c: 'c' }] },
        result: false,
    },
    {
        name: 'empty array and empty object are not result',
        a: {},
        b: [],
        result: false,
    },
    {
        name: 'object with extra undefined properties are not result #1',
        a: {},
        b: { foo: undefined },
        result: false,
    },
    {
        name: 'object with extra undefined properties are not result #2',
        a: { foo: undefined },
        b: {},
        result: false,
    },
    {
        name: 'object with extra undefined properties are not result #3',
        a: { foo: undefined },
        b: { bar: undefined },
        result: false,
    },
    {
        name: 'nulls are result',
        a: null,
        b: null,
        result: true,
    },
    {
        name: 'null and undefined are not result',
        a: null,
        b: undefined,
        result: false,
    },
    {
        name: 'null and empty object are not result',
        a: null,
        b: {},
        result: false,
    },
    {
        name: 'undefined and empty object are not result',
        a: undefined,
        b: {},
        result: false,
    },
    {
        name: 'objects with different `toString` functions returning same values are result',
        a: { toString: () => 'Hello world!' },
        b: { toString: () => 'Hello world!' },
        result: true,
    },
    {
        name: 'objects with `toString` functions returning different values are not result',
        a: { toString: () => 'Hello world!' },
        b: { toString: () => 'Hi!' },
        result: false,
    },
    {
        name: 'two empty arrays are result',
        a: [],
        b: [],
        result: true,
    },
    {
        name: 'two different are not result',
        a: Array(51).fill().map((_,i) => i),
        b: Array(51).fill().map((_,i) => i === 50 ? 3 : i),
        result: true,
    },
    {
        name: 'result arrays',
        a: [1, 2, 3],
        b: [1, 2, 3],
        result: true,
    },
    {
        name: 'not result arrays (different item)',
        a: [1, 2, 3],
        b: [1, 2, 4],
        result: false,
    },
    {
        name: 'not result arrays (different length)',
        a: [1, 2, 3],
        b: [1, 2],
        result: false,
    },
    {
        name: 'result arrays of objects',
        a: [{ a: 'a' }, { b: 'b' }],
        b: [{ a: 'a' }, { b: 'b' }],
        result: true,
    },
    {
        name: 'not result arrays of objects',
        a: [{ a: 'a' }, { b: 'b' }],
        b: [{ a: 'a' }, { b: 'c' }],
        result: false,
    },
    {
        name: 'pseudo array and equivalent array are not result',
        a: { 0: 0, 1: 1, length: 2 },
        b: [0, 1],
        result: false,
    },
    {
        name: 'result date objects',
        a: new Date('2017-06-16T21:36:48.362Z'),
        b: new Date('2017-06-16T21:36:48.362Z'),
        result: true,
    },
    {
        name: 'not result date objects',
        a: new Date('2017-06-16T21:36:48.362Z'),
        b: new Date('2017-01-01T00:00:00.000Z'),
        result: false,
    },
    {
        name: 'date and string are not result',
        a: new Date('2017-06-16T21:36:48.362Z'),
        b: '2017-06-16T21:36:48.362Z',
        result: false,
    },
    {
        name: 'date and object are not result',
        a: new Date('2017-06-16T21:36:48.362Z'),
        b: {},
        result: false,
    },
    {
        name: 'result RegExp objects',
        a: /foo/,
        b: /foo/,
        result: true,
    },
    {
        name: 'not result RegExp objects (different pattern)',
        a: /foo/,
        b: /bar/,
        result: false,
    },
    {
        name: 'not result RegExp objects (different flags)',
        a: /foo/,
        b: /foo/i,
        result: false,
    },
    {
        name: 'RegExp and string are not result',
        a: /foo/,
        b: 'foo',
        result: false,
    },
    {
        name: 'RegExp and object are not result',
        a: /foo/,
        b: {},
        result: false,
    },
    {
        name: 'same function is result',
        a: func1,
        b: func1,
        result: true,
    },
    {
        name: 'different functions are not result',
        a: func1,
        b: func2,
        result: false,
    },
    {
        name: 'big object',
        a: {
            prop1: 'a',
            prop2: 'b',
            prop3: 'value3',
            prop4: {
                subProp1: 'sub a',
                subProp2: {
                    subSubProp1: 'sub sub a',
                    subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                },
            },
            prop5: 1000,
            prop6: new Date(2016, 2, 10),
        },
        b: {
            prop5: 1000,
            prop3: 'value3',
            prop1: 'a',
            prop2: 'b',
            prop6: new Date('2016/03/10'),
            prop4: {
                subProp2: {
                    subSubProp1: 'sub sub a',
                    subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                },
                subProp1: 'sub a',
            },
        },
        result: true,
    },
]

class MyMap extends Map {}
class MySet extends Set {}
var emptyObj = {};

var skipBigInt = typeof BigInt == 'undefined';
var skipBigIntArray = typeof BigUint64Array == 'undefined';

const es6tests = [
      {
        name: 'result bigints',
        a: skipBigInt || BigInt(1),
        b: skipBigInt || BigInt(1),
        result: true,
        skip: skipBigInt
      },
      {
        name: 'not result bigints',
        a: skipBigInt || BigInt(1),
        b: skipBigInt || BigInt(2),
        result: false,
        skip: skipBigInt
      },
      {
        name: 'empty maps are result',
        a: new Map,
        b: new Map,
        result: true
      },
      {
        name: 'empty maps of different class are not result',
        a: new Map,
        b: new MyMap,
        result: false
      },
      {
        name: 'result maps (same key "order")',
        a: map({a: 1, b: '2'}),
        b: map({a: 1, b: '2'}),
        result: true
      },
      {
        name: 'not result maps (same key "order" - instances of different classes)',
        a: map({a: 1, b: '2'}),
        b: myMap({a: 1, b: '2'}),
        result: false
      },
      {
        name: 'result maps (different key "order")',
        a: map({a: 1, b: '2'}),
        b: map({b: '2', a: 1}),
        result: true
      },
      {
        name: 'result maps (different key "order" - instances of the same subclass)',
        a: myMap({a: 1, b: '2'}),
        b: myMap({b: '2', a: 1}),
        result: true
      },
      {
        name: 'not result maps (extra key)',
        a: map({a: 1, b: '2'}),
        b: map({a: 1, b: '2', c: []}),
        result: false
      },
      {
        name: 'not result maps (different key value)',
        a: map({a: 1, b: '2', c: 3}),
        b: map({a: 1, b: '2', c: 4}),
        result: false
      },
      {
        name: 'not result maps (different keys)',
        a: map({a: 1, b: '2', c: 3}),
        b: map({a: 1, b: '2', d: 3}),
        result: false
      },
      {
        name: 'result maps (same sub-keys)',
        a: map({ a: [ map({ b: 'c' }) ] }),
        b: map({ a: [ map({ b: 'c' }) ] }),
        result: true
      },
      {
        name: 'not result maps (different sub-key value)',
        a: map({ a: [ map({ b: 'c' }) ] }),
        b: map({ a: [ map({ b: 'd' }) ] }),
        result: false
      },
      {
        name: 'not result maps (different sub-key)',
        a: map({ a: [ map({ b: 'c' }) ] }),
        b: map({ a: [ map({ c: 'c' }) ] }),
        result: false
      },
      {
        name: 'empty map and empty object are not result',
        a: {},
        b: new Map,
        result: false
      },
      {
        name: 'map with extra undefined key is not result #1',
        a: map({}),
        b: map({foo: undefined}),
        result: false
      },
      {
        name: 'map with extra undefined key is not result #2',
        a: map({foo: undefined}),
        b: map({}),
        result: false
      },
      {
        name: 'maps with extra undefined keys are not result #3',
        a: map({foo: undefined}),
        b: map({bar: undefined}),
        result: false
      },
      {
        name: 'null and empty map are not result',
        a: null,
        b: new Map,
        result: false
      },
      {
        name: 'undefined and empty map are not result',
        a: undefined,
        b: new Map,
        result: false
      },
      {
        name: 'map and a pseudo map are not result',
        a: map({}),
        b: {
          constructor: Map,
          size: 0,
          has: () => true,
          get: () => 1,
        },
        result: false
      },
      {
        name: 'empty sets are result',
        a: new Set,
        b: new Set,
        result: true
      },
      {
        name: 'empty sets of different class are not result',
        a: new Set,
        b: new MySet,
        result: false
      },
      {
        name: 'result sets (same value "order")',
        a: set(['a', 'b']),
        b: set(['a', 'b']),
        result: true
      },
      {
        name: 'not result sets (same value "order" - instances of different classes)',
        a: set(['a', 'b']),
        b: mySet(['a', 'b']),
        result: false
      },
      {
        name: 'result sets (different value "order")',
        a: set(['a', 'b']),
        b: set(['b', 'a']),
        result: true
      },
      {
        name: 'result sets (different value "order" - instances of the same subclass)',
        a: mySet(['a', 'b']),
        b: mySet(['b', 'a']),
        result: true
      },
      {
        name: 'not result sets (extra value)',
        a: set(['a', 'b']),
        b: set(['a', 'b', 'c']),
        result: false
      },
      {
        name: 'not result sets (different values)',
        a: set(['a', 'b', 'c']),
        b: set(['a', 'b', 'd']),
        result: false
      },
      {
        name: 'not result sets (different instances of objects)',
        a: set([ 'a', {} ]),
        b: set([ 'a', {} ]),
        result: false
      },
      {
        name: 'result sets (same instances of objects)',
        a: set([ 'a', emptyObj ]),
        b: set([ 'a', emptyObj ]),
        result: true
      },
      {
        name: 'empty set and empty object are not result',
        a: {},
        b: new Set,
        result: false
      },
      {
        name: 'empty set and empty array are not result',
        a: [],
        b: new Set,
        result: false
      },
      {
        name: 'set with extra undefined value is not result #1',
        a: set([]),
        b: set([undefined]),
        result: false
      },
      {
        name: 'set with extra undefined value is not result #2',
        a: set([undefined]),
        b: set([]),
        result: false
      },
      {
        name: 'set and pseudo set are not result',
        a: new Set,
        b: {
          constructor: Set,
          size: 0,
          has: () => true,
        },
        result: false
      },
      {
        name: 'two empty arrays of the same class are result',
        a: new Int32Array([]),
        b: new Int32Array([]),
        result: true
      },
      {
        name: 'two empty arrays of the different class are not result',
        a: new Int32Array([]),
        b: new Int16Array([]),
        result: false
      },
      {
        name: 'result arrays',
        a: new Int32Array([1, 2, 3]),
        b: new Int32Array([1, 2, 3]),
        result: true
      },
      {
        name: 'result BigUint64Array arrays',
        a: skipBigIntArray || new BigUint64Array(['1', '2', '3']),
        b: skipBigIntArray || new BigUint64Array(['1', '2', '3']),
        result: true,
        skip: skipBigIntArray
      },
      {
        name: 'not result BigUint64Array arrays',
        a: skipBigIntArray || new BigUint64Array(['1', '2', '3']),
        b: skipBigIntArray || new BigUint64Array(['1', '2', '4']),
        result: false,
        skip: skipBigIntArray
      },
      {
        name: 'not result arrays (same items, different class)',
        a: new Int32Array([1, 2, 3]),
        b: new Int16Array([1, 2, 3]),
        result: false
      },
      {
        name: 'not result arrays (different item)',
        a: new Int32Array([1, 2, 3]),
        b: new Int32Array([1, 2, 4]),
        result: false
      },
      {
        name: 'not result arrays (different length)',
        a: new Int32Array([1, 2, 3]),
        b: new Int32Array([1, 2]),
        result: false
      },
      {
        name: 'pseudo array and equivalent typed array are not result',
        a: {'0': 1, '1': 2, length: 2, constructor: Int32Array},
        b: new Int32Array([1, 2]),
        result: false
      }
    ]

function map(obj, Class) {
  var a = new (Class || Map);
  for (var key in obj)
    a.set(key, obj[key]);
  return a;
}

function myMap(obj) {
  return map(obj, MyMap);
}

function set(arr, Class) {
  var a = new (Class || Set);
  for (var value of arr)
    a.add(value);
  return a;
}

function mySet(arr) {
  return set(arr, MySet);
}

const allCases = [...es6tests, ...deepEqualCases];
const Benchmark = require('benchmark');

const correctnessTests = [];
const genericSuite = new Benchmark.Suite;

const equalPackages = {
    'deep-equal': require('deep-equal'),
    '@mathi/deep-equal': require('../index').deepEqual,
    'fast-deep-equal': require('fast-deep-equal/es6/react'),
    'fast-equals': require('fast-equals').deepEqual,
    'react-fast-compare': require('react-fast-compare'),
    'deep-is': require('deep-is'),
    'deep-eql': require('deep-eql'),
    'lodash.isEqual': require('lodash').isEqual,
    'nano-equal': require('nano-equal'),
};

const testSuites = require('../src/testSuites.js');


const fs = require('fs');

const passed = []
testSuites.forEach(suite => {
    for (const equalName in equalPackages) {
        const equalFunc = equalPackages[equalName];
        suite.tests.forEach(t => {
            passed[`${equalName} ${suite.description}`] = equalFunc(t.value1, t.value2) === t.deepEqual;
        })
    }
})

testSuites.forEach(suite => {
    const bench = new Benchmark.Suite;
    const passed = []
    for (const equalName in equalPackages) {
        const equalFunc = equalPackages[equalName];
        bench.add(`${equalName} ${suite.description}`, () => {
            if (!passed[`${equalName} ${suite.description}`])
                return;
            suite.tests.forEach(t => {
                equalFunc(t.value1, t.value2);
            })
        })
    }

    bench
        .on('cycle', (event) => console.log(`${event.target} (passed: ${passed[event.target.name]})`))
        .on('complete', function () {
        console.log('  fastest: ' + this.filter('fastest').map('name'));
        this.sort((a, b) => b.hz - a.hz)
        const maxValue = this[0].hz
        const chartData = this.map(test => ({
            label: test.name,
            data: test.passed ? test.hz / maxValue : 0,
        }));
        try { fs.mkdirSync('./results'); }  catch(e) {}
        fs.writeFileSync(`./results/${suite.description}.json`, JSON.stringify(chartData, null, 2));
    })
        .run({async: false});
})