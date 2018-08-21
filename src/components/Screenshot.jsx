import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import clipboard from 'clipboard';

const styles = theme => ({
  screenshot: {
    textAlign: 'center',
    padding: '16px 0',
  }, 
  image: {
    width: '100% !important',
    height: 'auto !important'
  }
});

class Screenshot extends React.Component {
  state = {
    open: false,
    snackBarCopy: '',
  };

  handleCopy = () => {
    this.setState({ open: true , snackBarCopy: 'Url Copied!'});
  }

  handleDownload = (url) => {
    window.open(url);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, screenshot } = this.props;
    const clipboard = new ClipboardJS('.copy-url'); // eslint-disable-line
    return (
      <div className={classes.screenshot}>
        <Card className={classes.card}>
          <img
            className={classes.image}
            src={screenshot.screenshotUris[0].uri}
            alt={screenshot.titleName}>
          </img>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {screenshot.titleName}
            </Typography>
            <Typography component="p">
              
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              className="copy-url"
              data-clipboard-text={screenshot.screenshotUris[0].uri}
              size="small"
              color="primary"
              onClick={() => this.handleCopy()}>
              Copy Url
            </Button>
            <Button 
              className="download-image"
              size="small"
              color="primary"
              onClick={() => this.handleDownload(screenshot.screenshotUris[0].uri)}>
              Download
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.snackBarCopy}</span>}
              action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                Close
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Screenshot.propTypes = {
  classes: PropTypes.object.isRequired,
  screenshot: PropTypes.object
};

export default withStyles(styles)(Screenshot);