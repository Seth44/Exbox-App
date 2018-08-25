import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import routes from "../../routes/routes";

import { authenticate } from "../../services/gifService";

import { searchGamertag } from '../../state/currentUser/actions';

//components
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Search from  '../Search/Search';
import NavItems from '../NavItems/NavItems';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navToolbar: {
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: `${drawerWidth}px`,
    },
  },
});

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect to={prop.to} key={key} />;
      return <Route exact path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  onGamertagSearch = (gamertag) => {
    this.props.searchGamertag(gamertag);
    authenticate();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  renderMain() {
    const { isSearching, searchError, gamertag } = this.props.currentUser;
    if (isSearching) {
      return (<Spinner gamertag={gamertag} />);
    } else if (searchError) {
      return (<Error message={`Could not find Gamertag: ${gamertag}`}/>);
    } else {
      return (
        <div>
          {switchRoutes}
        </div>
      )
    }
}

  render() {
    const { classes, theme, currentUser } = this.props;
    const { xuid, isSearching, searchError, profile } = currentUser;
    const gamertag = (profile) ? profile.Gamertag : currentUser.gamertag;
    const hasResults = (xuid && !isSearching && !searchError);
    const mainContent = this.renderMain();
    const noResultsStyle = (hasResults) ? {} : { width: '100%'};
    const noResultsContentStyle = (hasResults) ? {} : { marginLeft: 0};

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography 
            variant="headline"
            style={{
              padding: '16px',
              textAlign: 'center'
            }}
          >
            {gamertag}
          </Typography>
        </div>
        <Divider />
        <NavItems />
        {/* <List>{routes}</List> */}
        {/* <Divider /> */}
        {/* <List>{otherMailFolderListItems}</List> */}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={(hasResults) ? classes.appBar : ''} style={noResultsStyle}>
          <Toolbar className={classes.navToolbar}>
          {hasResults && 
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
          }
            <Search 
              onSearch={this.onGamertagSearch}
              disabled={isSearching}
            />
          </Toolbar>
        </AppBar>
        {hasResults && <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>}
        {hasResults && <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>}
        <main className={classes.content} style={noResultsContentStyle}>
          <div className={classes.toolbar} />
          {mainContent}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer)));
