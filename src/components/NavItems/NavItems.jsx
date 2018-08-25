import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import routes from "../../routes/routes";
import './navItems.css';

const styles = theme => ({
  navItems: {
    textAlign: 'center',
    textDecoration: 'none'
  },

});

function NavItems(props) {
  const { classes, currentUser } = props;
  const { profile } = currentUser;
  const gamertag = (!profile) ? currentUser.gamertag : profile.Gamertag
  return (
    <List className={classes.navItems}>
      {routes.map((route, key) => {
        if (route.redirect || !route.sidebarName) return null;
        const path = route.path.replace(/:gamertag/i, gamertag);
        return (
          <NavLink 
            to={path}
            activeClassName="active"
            key={key}
            className="nav-item"
          >
            <ListItem button >
              <ListItemIcon>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.sidebarName} />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})


export default connect(mapStateToProps)(withStyles(styles)(NavItems));
