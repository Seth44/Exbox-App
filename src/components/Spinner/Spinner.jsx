import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
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
  const { classes } = props;
  return (
    <div className={classes.spinner}>
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);