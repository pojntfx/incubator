import * as React from "react";
import { render } from "react-dom";
import "./scss/main.scss";
import { App } from "./components/App";

render(<App />, document.getElementById("root"));

export { App };
