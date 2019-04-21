import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
	{
		input: './src/index.js',
		external: [
			'axios',
			'express'
		],
		output: {
			name: 'basic-example',
			file: './build/index.js',
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
		]
	}
];
