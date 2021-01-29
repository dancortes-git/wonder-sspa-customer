import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";

const generateClassName = createGenerateClassName({
  productionPrefix: "cus",
});

export default (props) => {
  const {
    onSignOut,
    getUser,
    addSignInEventListener,
    removeSignInEventListener,
    addSignOutEventListener,
    removeSignOutEventListener,
  } = props;
  const [user, setUser] = useState((getUser && getUser()) || null);
  const [isSignedIn, setIsSignedIn] = useState(!!user);

  const onEventSignInOrSignOutCallback = ({ detail: userLogged }) => {
    setUser(userLogged);
    setIsSignedIn(!!userLogged);
  };

  // Add Sign In event listener
  useEffect(() => {
    addSignInEventListener &&
      addSignInEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignInEventListener &&
        removeSignInEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignInEventListener, removeSignInEventListener]);

  // Add Sign Out event listener
  useEffect(() => {
    addSignOutEventListener &&
      addSignOutEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignOutEventListener &&
        removeSignOutEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignOutEventListener, removeSignOutEventListener]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/">
            <Header isSignedIn={isSignedIn} onSignOut={onSignOut} user={user} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};
