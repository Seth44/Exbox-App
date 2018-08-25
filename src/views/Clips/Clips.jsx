import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfiniteLoaderClips from '../../components/InfiniteLoader/InfiniteLoaderClips';

import { authenticate } from "../../services/gifService";

import { searchGamertag } from '../../state/currentUser/actions';

const styles = theme => ({
  dashboard: {
    textAlign: 'left'
  },
});

class Clips extends React.Component {

  componentWillMount() {
    authenticate();
    const gamertag = this.props.match.params.gamertag;
    if (!this.props.currentUser.xuid && gamertag) {
      this.props.searchGamertag(gamertag, 'clips');
    }
  }

  render() {
    const { classes, currentUser } = this.props;
    const { clips } = currentUser;
    if (!clips) return null;
    return (
      <section className={classes.dashboard}>
        <Typography variant="headline" >Clips: </Typography>
        <InfiniteLoaderClips items={clips} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clips));
