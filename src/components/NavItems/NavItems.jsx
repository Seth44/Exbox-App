import React from 'react';
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
  const { classes } = props;
  return (
    <List className={classes.navItems}>
      {routes.map((route, key) => {
        if (route.redirect) return null;
        return (
          <NavLink 
            to={route.path}
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


export default withStyles(styles)(NavItems);