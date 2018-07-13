import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  description: {
    textAlign: 'center'
  },
  spinner: {
    width: '100%'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block' 
  },
});

function Spinner(props) {
  const { classes, gamertag } = props;
  return (
    <div className={classes.spinner}>
    <Typography variant="subheading" className={classes.description}>
      Fetching {gamertag}'s data...
    </Typography>
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  gamertag: PropTypes.string
};

export default withStyles(styles)(Spinner);