/**
 * Insert data in template
 *
 * @export
 * @param {Object} helmet Helmet rendered static
 * @param {string} [content=''] JSS string
 * @param {*} store Redux store
 * @param {string} css CSS string
 * @return {string} HTML template
 */
export default function template(helmet, content = '', store, css) {
  const state = store.getState();

  const stateScript = `<script id="ssr-preload-state">
                    window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
                  </script>`;

  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  const page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#556cd6">
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="icon" href="/favicon.ico" type="image/x-icon">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                ${
                  process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
                <style id="jss-server-side">${css}</style>
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">${content}</div>
                </div>
                
                ${stateScript}
              </body>
              `;
  return page;
}
