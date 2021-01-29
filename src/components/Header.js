import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    a: {
      textDecoration: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  avatar: {
    cursor: "pointer",
  },
  userMenu: {
    paddingLeft: 30,
    paddingRight: 30,
  },
}));

export default function Header({ isSignedIn, onSignOut, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            Wonder
          </Typography>
          {isSignedIn ? (
            <React.Fragment>
              <Avatar
                alt={`userName`}
                className={classes.avatar}
                onClick={handleClick}
              />
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem className={classes.userMenu} disabled={true}>
                  {user.name || "user"}
                </MenuItem>
                <MenuItem
                  className={classes.userMenu}
                  onClick={() => onSignOut()}
                >
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              component={RouterLink}
              to={isSignedIn ? "/" : "/auth/signin"}
              onClick={onClick}
            >
              {isSignedIn ? "Logout" : "Login"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
