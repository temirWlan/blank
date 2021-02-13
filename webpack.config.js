const path = require('path');
require('dotenv').config();

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production' ? true : false;

module.exports = {
  mode,
  output: {
     filename: "script.js"
  },
  watch: isProd,
  devtool: isProd ? "" : "source-map",
  module: {
     rules: [
        {
        	test: /\.m?js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
              loader: "babel-loader",
              options: {
                	presets: [["@babel/preset-env", {
                    debug: true,
                    corejs: 3,
                    useBuiltIns: "usage"
                }]]
              }
           }
        }
    	]
  }
};
