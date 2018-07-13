import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

function Clip(props) {
  const { classes, clip } = props;
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
          <Typography component="p">
            
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

Clip.propTypes = {
  classes: PropTypes.object.isRequired,
  clip: PropTypes.object
};

export default withStyles(styles)(Clip);