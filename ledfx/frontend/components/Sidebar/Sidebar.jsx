import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import sidebarStyle from "./style.jsx";
import viewRoutes from "frontend/routes/views.jsx";
import logoAsset from "frontend/assets/img/logo.png";

class Sidebar extends React.Component {

  isViewActive(viewName) {
    return this.props.location.pathname.indexOf(viewName) > -1 ? true : false;
  }

  render() {
    const { classes, color } = this.props;

    var links = (
      <List className={classes.list}>
        {
          viewRoutes.map((prop, key) => {
            if (prop.redirect || !prop.sidebarName) {
              return null;
            }

            var listItemClass = classes.itemLink
            if (this.isViewActive(prop.path)) {
              listItemClass = listItemClass + " " + classes.activeView
            }

            return (
              <NavLink
                to={prop.path}
                className={classes.item}
                activeClassName="active"
                key={key}>
                <ListItem button className={listItemClass}>
                  <ListItemIcon className={classes.itemIcon}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.sidebarName}
                    className={classes.itemText}
                    disableTypography={true}/>
                </ListItem>
              </NavLink>
            );
          })
        }
      </List>
    );

    var logo = (
      <div className={classes.logo}>
        <a href="#" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logoAsset} alt="logo" className={classes.img} />
          </div>
          LedFx
        </a>
      </div>
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}>

            {logo}
            <div className={classes.sidebarWrapper}>{links}</div>
            <div className={classes.background}/>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}>

            {logo}
            <div className={classes.sidebarWrapper}>{links}</div>
            <div className={classes.background}/>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
