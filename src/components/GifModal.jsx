import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/ContentCopy';
import Tooltip from '@material-ui/core/Tooltip';

import clipboard from 'clipboard';

import ProgressBar from './ProgressBar';

function getModalStyle() {

  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '90%',
    maxWidth: '1080px',
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

  buildGfycatUrl = (name) => {
    return `https://gfycat.com/${name}`;
  }

  renderContent = () => {
    const { status } = this.props;
    let content;

    if (status.task === "complete") {
      const url = this.buildGfycatUrl(status.gfyname)
      const clipboard = new ClipboardJS('.copy-gif-url', { // eslint-disable-line
        container: document.getElementById('gif-modal')
      });
      content = (
        <div>
          <div className="url-section" style={{display: 'flex', alignItems: 'center'}}>
            <TextField
              id="read-only-input"
              label="Copy Me"
              value={url}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              style={{flexGrow: 1}}
            />
            <div>
              <Tooltip title="Copy Url">
                <Button
                  className="copy-gif-url"
                  data-clipboard-text={url}
                  variant="fab" 
                  color="primary"
                  aria-label="Copy"
                >
                  <FileCopyIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
          <br />
          <div style={{position: 'relative', paddingBottom: '56.25%'}}>
            <iframe src={`https://gfycat.com/ifr/${status.gfyname}`} 
                    frameborder='0' 
                    scrolling='no'
                    width='100%'
                    height='100%'
                    style={{position: 'absolute', top:0, left: 0,}}
                    allowfullscreen>
            </iframe>
          </div>
          <br />
          <Button 
            size="small"
            color="primary"
            onClick={this.handleClose}
          >
            Close
          </Button>
        </div>
      )
    } else {
      content = (
        <div>
            <Typography gutterBottom variant="title" component="h2">
              Creating Gif...
            </Typography>
            <br />
            <Typography gutterBottom variant="subheading" component="h2">
              This may take a few minutes.
            </Typography>
            <br />
            <ProgressBar progress={status.progress} />
        </div>
      )
    }
    return content;
  }

  render() {
    const { classes } = this.props;
    const modalContent = this.renderContent();

    return (
      <div>
        <Button 
          size="small"
          color="primary"
          onClick={this.openGifModal}
        >
          Create Gif
        </Button>
        <Modal
          id="gif-modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          disableBackdropClick
        >
          <div style={getModalStyle()} className={classes.paper}>
            {modalContent}
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
