const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
	entry: './js/dashboard_main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 8192, // Convert images < 8kb to base64 strings
					},
				},
				generator: {
					filename: 'assets/[name][hash][ext][query]',
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin(),
			new ImageMinimizerPlugin({
				minimizerOptions: {
					plugins: [
						['imagemin-mozjpeg', { quality: 65 }],
						['imagemin-optipng', { optimizationLevel: 5 }],
						['imagemin-svgo', {
							plugins: [
								{ removeViewBox: false },
								{ cleanupIDs: false },
							],
						}],
					],
				},
			}),
		],
	},
	mode: 'production',
};
