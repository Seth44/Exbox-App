import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  initial: {
    textAlign: 'center'
  },
});

function Initial(props) {
  const { classes } = props;
  return (
    <section className={classes.initial}>
      <Typography variant="headline">Welcome to Exbox!</Typography>
      
      <Typography variant="subheading">Search for a gamertag to get started.</Typography>
    </section>
  );
}


export default withStyles(styles)(Initial);