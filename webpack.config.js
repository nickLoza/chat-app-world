const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require("dotenv-webpack");

const ruleForJs = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: 
				[
					'@babel/preset-react',
					{runtime: "automatic"}
				]
		}
	}
};

const ruleForTsx = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	use: ['ts-loader']
};

const ruleForSass = {
	test: /.(css|sass|scss)$/,
	use : ["style-loader","css-loader","sass-loader"]
}

const ruleForImg = {
	test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
	type: "asset"
}


const rules = [ ruleForTsx, ruleForJs, ruleForSass, ruleForImg ]


module.exports = {
	devtool: "eval-cheap-source-map",
	entry: "./src/index.tsx",
	plugins: [
		new Dotenv(),
		new HTMLWebpackPlugin({
			template: "./src/index.html"
		})
	],
	module: { rules },
	resolve:{
		extensions: [ '.tsx', '.ts','.jsx','.js' ],
	}
}