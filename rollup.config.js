import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/lib.js',
      sourcemap: true,
      format: 'cjs'
    },
    {
      file: 'dist/lib.min.js',
      sourcemap: true,
      format: 'cjs',
      plugins: [terser({
        sourceMap: true
      })]
    }
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' })
  ]
}