const path = require("path");

// removes old bundle fileds
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// creates index html file for entry, useful when scripts have hashed names
const HtmlWebpackPlugin = require("html-webpack-plugin");

// extract css out of js files
const CssExtractPlugin = require("extract-css-chunks-webpack-plugin");

// dev environment identifier
const is_dev = process.env.NODE_ENV === "development";

// css modules test
const cssModuleRegex = new RegExp(/\.module\.(less|css)$/);
const loaderUtils = require("loader-utils");

console.log("Node Environment", process.env.NODE_ENV);

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      // support for ES6 and linting
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"] // babel for ES6 syntax and eslint for js best practices
      },
      // parse and extract all less/css files
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: CssExtractPlugin.loader,
            options: { hot: is_dev, reloadAll: is_dev }
          },
          {
            loader: "css-loader",
            options: { 
                modules: { 
                    localIdentName: '[local]___[hash:base64:5]', 
                    getLocalIdent: getLocalIdent
                }
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CssExtractPlugin({
      filename: "[name].[contenthash:5].css",
      chunkFilename: "vendors.[contenthash:5].css"
    })
  ]
};


// modified naming function to handle css modules for files named .module.
function getLocalIdent(loaderContext, localIdentName, localName, options) {

    if (!cssModuleRegex.test(loaderContext.resourcePath)) {
        return localName;
    }

    if (!options.context) {
      // eslint-disable-next-line no-param-reassign
      options.context = loaderContext.rootContext;
    }
  
    const request = path
      .relative(options.context, loaderContext.resourcePath)
      .replace(/\\/g, '/');
  
    // eslint-disable-next-line no-param-reassign
    options.content = `${options.hashPrefix + request}+${localName}`;
  
    // eslint-disable-next-line no-param-reassign
    localIdentName = localIdentName.replace(/\[local\]/gi, localName);
  
    const hash = loaderUtils.interpolateName(
      loaderContext,
      localIdentName,
      options
    );
  
    return hash
      .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
      .replace(/^((-?[0-9])|--)/, '_$1');
  }
