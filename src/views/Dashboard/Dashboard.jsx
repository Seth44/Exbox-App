import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  dashboard: {
    textAlign: 'center'
  },
});

function Dashboard(props) {
  const { classes } = props;
  const { clips } = props.currentUser;
  return (
    <section className={classes.dashboard}>
      <Typography variant="headline" >Clips: </Typography>
      <video controls
        src={clips[0].gameClipUris[0].uri}
        width="500">
        Sorry, your browser doesn't support embedded videos.
      </video>
    </section>
  );
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
