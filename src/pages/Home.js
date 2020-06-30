import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'; 

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '4rem 0',
  }
};

const Home = ({ classes }) => {
  return (
    <div>
      <Helmet>
        <title>Beers home</title>
        <meta name="description" content="Brewdog's beer explorer" />
      </Helmet>
      <Container>
        <Typography className={classes.title} variant="h1">{'Brewdog\'s beer explorer'}</Typography>
        <Link to='/beers'>Show me the list</Link>
      </Container>
    </div>
  );
};

export default withStyles(styles)(Home);
