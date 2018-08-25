import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import GifModal from '../GifModal';

import { getGif } from '../../state/gif/actions';

const styles = theme => ({
  clip: {
    textAlign: 'center',
    padding: '16px 0',
  },
  video: {
    width: '100% !important',
    height: 'auto !important'
  }
});

class Clip extends React.Component {

  state = {
    modalOpen: false,
  };

  render() {
    const { classes, clip, gif } = this.props;
    const { status } = gif;
    const recordedDate = new Date(clip.dateRecorded).toDateString();
    return (
      <div className={classes.clip}> 
        <Card className={classes.card}>
          <video
            className={classes.video}
            controls
            src={clip.gameClipUris[0].uri}>
            Sorry, your browser doesn't support embedded videos.
          </video>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {clip.titleName}
            </Typography>
            <Typography variant="subheading" component="p">
              {recordedDate}
            </Typography>
          </CardContent>
          <CardActions>
          <GifModal
            url={clip.gameClipUris[0].uri}
            makeGif={this.props.getGif}
            status={status}
          />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Clip.propTypes = {
  classes: PropTypes.object.isRequired,
  clip: PropTypes.object
};

const mapStateToProps = state => ({
  gif: state.gif,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGif,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clip));