"use strict";
var { keys, prototype: { toString: d, hasOwnProperty: e }} = Object, { isView } = ArrayBuffer, { isArray } = Array
function x(a, b) {
    if (a === b) return true
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return (a !== a && b !== b)
    var c = a.constructor
    if (c !== b.constructor) return false
    switch (c) {
        case Object: {
            var ks = keys(a), i = ks.length
            if (i !== keys(b).length) return false
            var k
            for(; i--; ) {
                k = ks[i]
                
                if (!e.call(b, k) || !x(a[k], b[k])) return false
            }
            return true
        }
        case Map:
            if (a.size !== b.size) return false
            var vA
            for ([k, vA] of a) {
                if (!b.has(k) || !x(vA, b.get(k)))
                    return false
            }
            return true
        case Set:
            i = a.size
            if (i !== b.size) return false
            var aA = [...a.values()], bA = [...b.values()]
            for(; i--; ) if (!x(aA[i], bA[i])) return false
            return true
        case RegExp: return !(a.source !== b.source || a.flags !== b.flags)
        case Date: {
            var aT = a.getTime(), bT = b.getTime()
            return (aT === bT) || (aT !== aT && bT !== bT);
        }
        case Promise: return a === b
    }
    if (isArray(a)) {
        i = a.length
        if (i !== b.length) return false
        for(; i--; ) if (!x(a[i], b[i])) return false
        return true
    }
    if (isView(a)) {
        i = a.byteLength
        if (i !== b.byteLength) return false
        for(; i--; ) if (a[i] !== b[i] || (a[i] !== a[i] && b[i] !== b[i])) return false
        return true
    }
    if (a.toString !== d) return a.toString() === b.toString()
    return true
}
module.exports = { deepEqual: x }