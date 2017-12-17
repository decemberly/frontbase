// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const KssWebpackPlugin = require('kss-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// This library allows us to combine paths easily
const path = require('path');

module.exports =  {

  entry: {
    site: './assets/scss/site.scss',
    styleguide: './assets/scss/styleguide.scss'
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader'])
      },
    ],
  },

  plugins: [

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] },
      startPath: 'docs/styleguide'
    }),

    new ExtractTextPlugin({
      filename: "css/[name].css",
    }),

    new KssWebpackPlugin({
        title: 'Style Guide',
        source: ['assets/scss'],
        builder: 'assets/styleguide/template',
        destination: 'public/docs/styleguide',
        homepage: '../../readme.md',
        custom: ['group', 'code'],
        css: [
          '../../css/site.css',
          '../../css/styleguide.css'
        ],
        // namespace: 'components:' + srcPath + '/components/'
    }),

    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      context: 'assets/scss',
      syntax: 'scss'
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      svgo: {
        plugins: [
            {removeViewBox: false},
            {removeTitle: true},
            {removeDesc: true},
            {removeAttrs: false},
            {cleanupIDs: false}
        ],
      }
    }),

    new SVGSpritemapPlugin({
      src: 'assets/images/svg/*.svg',
      filename: 'images/spritemap.svg',
      prefix: '',
      svgo: {
        plugins: [
          {removeViewBox: false},
          {removeTitle: true},
          {removeDesc: true},
          {removeAttrs: { attrs: '(stroke|fill)' }},
          {removeStyleElement: true},
          {cleanupIDs: false}
        ],
      }
    })
  ],
};