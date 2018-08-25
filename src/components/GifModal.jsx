import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import ProgressBar from './ProgressBar';

function getModalStyle() {

  return {
    top: `10%`,
    left: `10%`,
    transform: `translate(-10%, -10%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class GifModal extends React.Component {
  state = {
    open: false,
  };

  openGifModal = () => {
    const { url, makeGif } = this.props;
    makeGif(url);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, status } = this.props;

    return (
      <div>
        <Button 
          size="small"
          color="primary"
          onClick={this.openGifModal}
        >
          Share
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {status.progress && <ProgressBar progress={status.progress} />}
          </div>
        </Modal>
      </div>
    );
  }
}

GifModal.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

export default withStyles(styles)(GifModal);
