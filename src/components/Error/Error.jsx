import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  error: {
    textAlign: 'center'
  },
});

function Error(props) {
  const { message, classes } = props;
  return (
    <div className={classes.error}>
      {message}
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Error);