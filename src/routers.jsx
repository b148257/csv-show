import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Index from "./pages/index";
import Page1 from "./pages/Page1";

export default () => {
  return (
    <Switch>
      <Route path="/index">
        <Index />
      </Route>
      <Route path="/A">
        <Page1 />
      </Route>
      <Route path="/" component={() => <Redirect to="/index" />} />
    </Switch>
  );
};
