const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: [
		'./src/components/BaseCard.vue',
		'./src/components/Button.vue',
		'./src/components/LoadingScreen.vue',
		'./src/components/Modal.vue',
		'./src/components/Sidebar.vue',
		'./src/components/StarGroup.vue',
		'./src/components/Timer.vue',
		'./src/components/ToggleGroup.vue',
		'./src/components/TopBar.vue',
	],
	output: {
		path: path.resolve(__dirname, './dist'),
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.min.css',
		}),
	],
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
		],
	},
};
