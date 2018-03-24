import Navigation from "../components/Navigation";
import { Fragment } from "react";

export default ({ title }) => Content => ({ ...otherProps }) => (
  <Fragment>
    <header>
      <h1>{title}</h1>
      <Navigation />
    </header>
    <Content {...otherProps} />
  </Fragment>
);
