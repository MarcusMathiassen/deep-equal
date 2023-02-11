// rollup.config.js
import { terser } from 'rollup-plugin-terser'

const inputs = ['index', 'react']
const formats = ['esm', 'cjs']

export default inputs.reduce((acc, input) => {
    acc.push(
        ...formats.map((format) => ({
            input: `src/${input}.js`,
            output: {
                name: 'deepEqual',
                file: `dist/${input !== 'index' ? `${input}/index` : input}${
                    format === 'umd' ? '' : `.${format === 'esm' ? 'js' : `${format}`}`
                }`,
                format,
            },
            plugins: [
                terser({
                    module: true,
                    compress: { defaults: false, module: true, hoist_vars: true, join_vars: false, sequences: false },
                    mangle: true,
                    output: {
                        beautify: true,
                    },
                    parse: {},
                    rename: {},
                }),
            ],
        }))
    )
    return acc
}, [])
