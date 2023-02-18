//
// We get a direct reference to commonly
// used functions and give them new
// names so the minifier can minify them.
//
// note: A minifier might do this by default
//       but we disable those defaults to maintain
//       performance. We are mostly interested in
//       the variable renaming.
var {
        keys: objectKeys,
        prototype: {
            toString: objectToString,
            hasOwnProperty: objectHasOwnProperty
        }
    } = Object,
    isArray = Array.isArray,
    isView = ArrayBuffer.isView

export function deepEqual(a, b) {
    'use strict'

    // Strict Equality
    // catches: truthy values (not NaNs though - see below)
    if (a === b) return true

    // catches: falsy and non-object values
    if (
        a === null ||
        b === null ||
        typeof a !== 'object' ||
        typeof b !== 'object'
    )
        // here is that NaN check
        return a !== a && b !== b

    // At this point all primitive values have been caught and
    // checked for equality

    // We now know that we have objects so
    // if the constructors are different
    // they are not equal
    var constructor = a.constructor
    if (constructor !== b.constructor) return false

    switch (constructor) {
        case Object:
            var keys = objectKeys(a)
            var i = keys.length
            if (i !== objectKeys(b).length) return false
            for (; i--; ) {
                var key = keys[i]
                if (
                    !objectHasOwnProperty.call(b, key) ||
                    !deepEqual(a[key], b[key])
                )
                    return false
            }
            return true

        case Date:
            a = a.getTime()
            b = b.getTime()
            // `getTime()` returns NaN for invalid dates
            return a === b || (a !== a && b !== b)

        case Map:
            if (a.size !== b.size) return false
            // Can't use `b.get(key) !== undefined` as a
            // replacement for `!b.has(key)` since maps may
            // have entries with values set to undefined
            var entry
            for (entry of a)
                if (!b.has(entry[0]) || !deepEqual(entry[1], b.get(entry[0])))
                    return false
            return true

        case Set:
            var i = a.size
            if (i !== b.size) return false
            a = [...a]
            b = [...b]
            for (; i--; ) if (!deepEqual(a[i], b[i])) return false
            return true

        case RegExp:
            return a.source === b.source && a.flags === b.flags

        case Promise:
            return false
    }

    if (isArray(a)) {
        var i = a.length
        if (i !== b.length) return false
        for (; i--; ) if (!deepEqual(a[i], b[i])) return false
        return true
    }

    if (isView(a)) {
        var i = a.byteLength
        if (i !== b.byteLength) return false
        for (; i--; )
            if (a[i] !== b[i] || (a[i] !== a[i] && b[i] !== b[i])) return false
        return true
    }

    return a.toString !== objectToString ? a.toString() === b.toString() : true
}
