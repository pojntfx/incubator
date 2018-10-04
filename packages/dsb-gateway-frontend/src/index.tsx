import * as React from "react";
import { render } from "react-dom";
import "./scss/main.scss";
import { App } from "./components/App";

render(
  <App endpoint="http://localhost:3000/list?username=296501&password=vplan2018" />,
  document.getElementById("root")
);

export { App };
