import Home from '../pages/Home';
import Beers from '../pages/Beers';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/beers',
    component: Beers,
    exact: true,
    initialMethod: Beers.initialFetchData,
  },
];
