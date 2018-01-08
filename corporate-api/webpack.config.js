//webpack.config.js
const path = require('path');

const CONFIG = {
	devtool: "inline-source-map",
	entry: "./app/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
        publicPath: "/dist/"
	},
	module: {
    loaders : [
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015","react"]
        }
      },
        {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        },
        {
            test: /\.jpg$/,
            loader: "file-loader"
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'

        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
    ]
  }
}

module.exports = CONFIG;