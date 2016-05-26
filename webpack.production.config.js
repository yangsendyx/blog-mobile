
var webpack = require('webpack');
var htmlWebpackPlugn = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', './src/fetch'],
		bundle: './src/index.js'
	},
	output: {
		publicPath: 'assets/',
		path: './dist/assets',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'autoprefixer?{browsers: ["last 2 versions", "> 1%", "firefox 15"]}'],
				exclude: './node_modules/'
			},
			{
				test: /\.less$/,
				loaders: ['style', 'css', 'autoprefixer?{browsers: ["last 2 versions", "> 1%", "firefox 15"]}', 'less'],
				exclude: './node_modules/'
			},
			{
				test: /\.jsx?$/,
				loaders: ["react-hot", "babel?presets[]=es2015&presets[]=react&plugins[]=transform-runtime"],
				exclude: "/node_modules/",
				include: path.resolve(__dirname, "src")
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				loader: 'url?limit=10000'
			},
			{
				test: /\.woff(2)?(.+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.(ttf|eot|svg|gif|ico)(.+)?$/,
				loader: "file"
			},
			{
				test: /\.json$/,
				loader: "json"
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.css', '.jsx', '.less', 'json']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			},
			minimize: true
		}),
		new htmlWebpackPlugn({
			template: './src/index.html',
			filename: '../index.html',
			chunks: ['vendor', 'bundle']
		})
	]
};