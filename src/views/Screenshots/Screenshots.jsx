import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfiniteLoaderScreenshots from '../../components/InfiniteLoader/InfiniteLoaderScreenshots';

const styles = theme => ({
  screenshots: {
    textAlign: 'left'
  },
});

function Screenshots(props) {
  const { classes } = props;
  const { screenshots } = props.currentUser;
  return (
    <section className={classes.screenshots}>
      <Typography variant="headline" >Screenshots: </Typography>
      <InfiniteLoaderScreenshots items={screenshots} />
    </section>
  );
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(withStyles(styles)(Screenshots));
