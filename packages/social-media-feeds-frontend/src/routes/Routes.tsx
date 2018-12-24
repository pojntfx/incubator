import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Michael } from "../pages/Michael";
import { Nette } from "../pages/Nette";
import { Toni } from "../pages/Toni";
import { Luis } from "../pages/Luis";
import { Felicitas } from "../pages/Felicitas";
import { Login } from "../pages/Login";

const RoutesRoute = (props: any) => (
  <BrowserRouter {...props}>
    <Switch>
      <Route path="/" render={() => <Redirect to="/home" />} exact />
      <Route path="/home" render={() => <Home />} />
      <Route path="/about" render={() => <About />} />
      <Route path="/michael" render={() => <Michael />} />
      <Route path="/nette" render={() => <Nette />} />
      <Route path="/toni" render={() => <Toni />} />
      <Route path="/luis" render={() => <Luis />} />
      <Route path="/felicitas" render={() => <Felicitas />} />
      <Route path="/login" render={() => <Login />} />
    </Switch>
  </BrowserRouter>
);

export { RoutesRoute };
