import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfiniteLoaderClips from '../../components/InfiniteLoader/InfiniteLoaderClips';

const styles = theme => ({
  dashboard: {
    textAlign: 'left'
  },
});

function Dashboard(props) {
  const { classes } = props;
  const { clips } = props.currentUser;
  return (
    <section className={classes.dashboard}>
      <Typography variant="headline" >Clips: </Typography>
      <InfiniteLoaderClips items={clips} />
    </section>
  );
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
