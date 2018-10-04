import * as React from "react";
import { render } from "react-dom";
import "./scss/main.scss";
import { App } from "./components/App";

render(
  <App endpoint="http://localhost:3000/list" />,
  document.getElementById("root")
);

export { App };
