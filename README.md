# static-template

Static template

#### Quick Start

```
# Install dependencies
npm run yarn

# Build assets
npm run build

# Start server
npm start
```

#### Development

```
# Start server with BrowserSync file watching and auto-reloading
npm run dev
```

You may need to restart the dev server if you add new files.

#### `/src/index.html`

The index page of the static site. If new pages are needed, they can be added
using an additional HtmlWebpackPlugin in `config/webpack/plugins.js`.

#### `/src/js/index.js`

This is the entry point for all JavaScript for the index page. It is processed
with Babel presets that enable writing in ES6/ES7. (See the `.babelrc` for
implemented presets and transforms.)

#### `/src/styles/modules/*.css`

All PostCSS files found in this directory are automatically imported via
webpack and processed similar to SASS `_modules` using the
[`precss`](https://github.com/jonathantneal/precss) plugin.

#### `/src/styles/mixins/*.css`

Mixins are imported when webpack starts and are available to all other CSS
files.

#### `/config/variables.js`

Variables are injected as SASS-like variables into all CSS files. Consequently,
the variables can be imported on the JavaScript side as well as be used like
`$colorTheme` on the CSS side.

#### `/static`

All static content like images and font files are stored in this directory. If
images are referenced using a relative path in the CSS or HTML, they will be
processed using [`url-loader`](https://github.com/webpack/url-loader) which
works like [`file-loader`](https://github.com/webpack/file-loader) except it
can inline files as data if under the specified limit of 10000 bytes. This
prevents unnecessary network calls for small files.

All static files are also copied directly to the root of the publicly served
directory in case they need to be referenced without the cache-busting file
name hashing.

#### `/config/webpack/*`

Contains all of the webpack configuration used for development and production
asset processing.

#### `/config/offline.js`

Configuration for the `offline-plugin` which uses services workers for Chrome
and Firefox and AppCache for Safari and other browsers that don't have service
worker support yet. This caches all the webpack assets offline for fast
reloading. The html pages are currently not being stored for offline caching so
that the browser doesn't need to be refreshed twice to see updates.
