const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const include = [
  path.resolve(__dirname, './src'),
  path.resolve(__dirname, './docs'),
  path.resolve(__dirname, './website'),
  path.resolve(__dirname, './examples'),
];

module.exports = {
  mode: 'development',
  entry: './website/index.tsx',
  output: {
    filename: 'hacker-ui-docs.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.doc-folder$/,
        include,
        use: [
          'babel-loader',
          { loader: path.resolve(__dirname, './loaders/docFolderLoader.js') },
        ],
      },
      {
        test: /\.example\.tsx$/,
        include,
        use: [
          // 'babel-loader',
          { loader: path.resolve(__dirname, './loaders/exampleLoader.js') },
        ],
      },
      {
        test: /\.mdx$/,
        include,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        include,
        exclude: [
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './examples'),
        ],
        loader: 'babel-loader',
        // options: {
        //   compilerOptions: {
        //     jsx: 'react',
        //     emitDeclarationOnly: false,
        //     declaration: false,
        //     // target: 'ES2015',
        //     // jsx: 'preserve',
        //   },
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mdx', '.doc-folder'],
    alias: {
      'hacker-ui': path.resolve(__dirname, './src/index.ts'),
      examples: path.resolve(__dirname, './examples'),
      website: path.resolve(__dirname, './website'),
    },
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({})],
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
};
