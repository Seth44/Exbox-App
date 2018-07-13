import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

function Screenshot(props) {
  const { classes, screenshot } = props;
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

Screenshot.propTypes = {
  classes: PropTypes.object.isRequired,
  screenshot: PropTypes.object
};

export default withStyles(styles)(Screenshot);