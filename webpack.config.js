/* eslint comma-dangle: 0 */
const webpack = require('webpack');
const path = require('path');
const prod = process.env.NODE_ENV === 'production';
const libraryName = 'scheduler';


const output = prod ? 
{
	path: path.resolve(__dirname, "build"),
	filename: `./${libraryName}.js`,
	library: libraryName,
	libraryTarget: 'umd',
	umdNamedDefine: true
} : 
{
	path: path.resolve(__dirname, "test"),
	publicPath: 'http://localhost:8080/',
	filename: 'bundle.js'
}

function getEntrySources() {
	if (!prod) {
		return ['./test/main.js']
	}
	return ['./src/scheduler.js'];
}

module.exports = {
	entry: {
		app: getEntrySources()
	},
	stats: {
		cached: false,
		cachedAssets: false,
		chunkModules: false,
		chunks: false,
		colors: true,
		errorDetails: true,
		hash: false,
		progress: true,
		reasons: false,
		timings: true,
		version: false
	},
	output,
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				plugins: ['transform-runtime', 'add-module-exports'],
				presets: ['es2015', 'stage-1']
			}
		}]
	},
	plugins: prod ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			}
		})
	] : []
};