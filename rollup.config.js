import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'react-showreel',
      file: 'dist/umd.js',
      format: 'umd'
    }, {
      file: 'dist/cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['react', 'react-dom', 'styled-components']
};
