import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { searchGamertag } from '../../state/currentUser/actions';

const styles = theme => ({
  dashboard: {
    textAlign: 'left'
  },
});

class Dashboard extends React.Component {

  componentWillMount() {
    const gamertag = this.props.match.params.gamertag;
    if (!this.props.currentUser.xuid && gamertag) {
      this.props.searchGamertag(gamertag);
    }
  }

  render() {
    const { classes, currentUser } = this.props;
    if (!currentUser.profile) return null;
    const { Gamertag, GameDisplayPicRaw } = currentUser.profile;
    const gamerPicUrl = GameDisplayPicRaw.replace(/http/i, 'https');
    return (
      <section className={classes.dashboard}>
        <Typography variant="headline" >{Gamertag}'s profile: </Typography>
        <img src={gamerPicUrl} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
