import express from 'express';
import ssr from './render';
import { createStore } from '../store';
import { matchRoutes } from 'react-router-config';
import Routes from '../router/routes';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const store = createStore();
    const actions = matchRoutes(Routes, req.path)
      .map(({ route }) =>
        route.initialMethod
          ? route.initialMethod({ ...store, path: req.path })
          : null,
      )
      .map(
        async (actions) =>
          await Promise.all(
            (actions || []).map(
              (p) =>
                p && new Promise((resolve) => p.then(resolve).catch(resolve)),
            ),
          ),
      );

    await Promise.all(actions);
    const response = ssr(req.url, store);
    res.status(200).send(response);
    return;
  });

export default server;
