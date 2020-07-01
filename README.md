# razzle-ssr-redux-example

influenced heavily by https://github.com/AlexMubarakshin/ssr-example 

but using Razzle and additional features

points of note:

the initialMethod is set up in the routes.js per route e.g.
```
  {
    path: '/beers',
    component: Beers,
    exact: true,
    initialMethod: Beers.initialFetchData,
  },
```
conditions for the fetch should be added to the initialMethod or in the action, as prefered

the example condition forces it to only fetch client side if beers list empty and is not loading 

as this is the inital state on server side (store is initialised empty) it will always run server side  

e.g. 

goto / in address bar 

use link to navigate to /beers - initial data is loaded client side

browser back to / 

use link to navigate back to /beers - initial data is already loaded and in redux store

goto /beers in address bar - initial data is loaded server side (and stored in redux store)

```
Beers.initialFetchData = ({ dispatch, getState /*, path*/ }) => {
  // Conditions to load data
  // Server: These should always be met by server initial state
  // Client: These conditions will be met on first load of page
  const beersState = getState().beers;
  const { beers, isLoading } = beersState;
  if (beers.length === 0 && !isLoading) {
    return [dispatch(beersActions.fetchBeers())];
  }
  // no need to fetch. Only client should get here
  return [];
};
```
RouteWithInitialMethod

used to interecpt Route and run initialMethod if present

useClientInitialMethod

makes sure initialMethod is only run on client (looks for global window) 
server runs the initialMethod with a Promise to allow async load to complete before rendering the component
