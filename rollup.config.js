// rollup.config.js
import { terser } from 'rollup-plugin-terser'

const inputName = 'index'
const inputsDirs = ['', 'react/']
const formats = ['esm', 'cjs', 'umd']

export default inputsDirs.reduce((acc, inputDir) => {
    acc.push(
        ...formats.map((format) => ({
            input: `${inputDir}${inputName}.js`,
            output: {
                name: 'deepEqual',
                file: `dist/${inputDir}${inputName}.${format}.js`,
                format,
            },
            plugins: [
                terser({
                    mangle: {
                        module: true,
                    },
                    compress: {
                        passes: 10,
                        module: true,
                        reduce_vars: true,
                        defaults: false,
                    },
                }),
            ],
        }))
    )
    return acc
}, [])
