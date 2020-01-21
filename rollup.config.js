import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'react-showreel',
      file: 'dist/umd.js',
      format: 'umd'
    },
    {
      file: 'dist/cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    postcss({
      extract: false
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve()
  ],
  external: ['react', 'react-dom']
}
