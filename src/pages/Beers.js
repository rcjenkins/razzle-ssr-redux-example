import React from 'react';
import { Helmet } from 'react-helmet';

import { useDispatch, useSelector} from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import * as beersActions from '../store/beer/beerSlice';

import BeerCard from '../components/BeerCard';

import useClientInitialFetchData from '../utils/useClientInitialFetchData'

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '4rem 0',
  }
};

const Beers = ({ classes }) => {
  const dispatch = useDispatch();
  const { beers, page, hasMore, isLoading } = useSelector(state => state.beers);

  useClientInitialFetchData(Beers.initialFetchData)

  const loadMoreBeers = () => {
    if (isLoading) return;
    dispatch(beersActions.fetchBeers(page + 1));
  };

  return (
    <div>
      <Helmet>
        <title>Beer list</title>
        <meta name="description" content="Brewdog's beer explorer" />
      </Helmet>
      <Container>
        <Typography className={classes.title} variant="h1">{'Brewdog\'s beer explorer'}</Typography>
        <InfiniteScroll
          initialLoad={false}
          loadMore={loadMoreBeers}
          hasMore={hasMore}
          threshold={900}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={8}
          >
            {
              beers.map((beer) => (
                <Grid item xs={12} sm={6} md={4} key={beer.id}>
                  <BeerCard beer={beer} />
                </Grid>
              ))
            }

          </Grid>
        </InfiniteScroll>

      </Container>
    </div>
  );
};

Beers.initialFetchData = ({dispatch, getState, path}) => {
  // Conditions to load data 
  // Server: These should always be met by server initial state
  // Client: These conditions will be met on first load of page
  const beersState = getState().beers
  const { beers, isLoading } = beersState
  if(beers.length === 0 && !isLoading ){
    return [dispatch(beersActions.fetchBeers())]
  }
  // no need to fetch. Only client should get here
  return []
};

export default withStyles(styles)(Beers);
