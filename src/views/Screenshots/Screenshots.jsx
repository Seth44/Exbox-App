import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfiniteLoaderScreenshots from '../../components/InfiniteLoader/InfiniteLoaderScreenshots';

import { searchGamertag } from '../../state/currentUser/actions';

const styles = theme => ({
  screenshots: {
    textAlign: 'left'
  },
});

class Screenshots extends React.Component {

  componentWillMount() {
    const gamertag = this.props.match.params.gamertag;
    if (!this.props.currentUser.xuid && gamertag) {
      this.props.searchGamertag(gamertag, 'screenshots');
    }
  }

  render() {
    const { classes, currentUser } = this.props;
    const { screenshots } = currentUser;
    if (!screenshots) return null;
    return (
      <section className={classes.screenshots}>
        <Typography variant="headline" >Screenshots: </Typography>
        <InfiniteLoaderScreenshots items={screenshots} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchGamertag,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Screenshots));
