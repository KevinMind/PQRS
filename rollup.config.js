import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

import config from './tools/config';

const formatFile = format => `${config.PROJECT_BUILD}/${pkg.name}.${format}.js`;

const formatIndex = path => `${path}/index.js`;

export default [
	{
		input: formatIndex(config.PROJECT_SRC),
		output: {
			name: pkg.name,
			file: formatIndex(config.PROJECT_BUILD),
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			typescript(), // so Rollup can read typescript
			commonjs(), // so Rollup can convert `ms` to an ES module
		]
	},
	{
		input: formatIndex(config.PROJECT_SRC),
		external: [],
		output: [
			{ file: formatFile('cjs'), format: 'cjs' },
			{ file: formatFile('es'), format: 'es' }
		]
	}
];
