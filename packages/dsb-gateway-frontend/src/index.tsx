import * as React from "react";
import { render } from "react-dom";
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import "./scss/main.scss";
import { App } from "./components/App";

const adapter = new LocalStorage("db");
const db = low(adapter);

db.defaults({
  settingsAreOpen: true,
  username: "296501",
  password: "vplan2018",
  listEndpoint: "http://localhost:3000/list",
  staticEndpoint: "http://localhost:4000",
  dsbEndpoint: "https://www.dsbmobile.de/Login.aspx",
  endpoint: undefined
}).write();

render(<App db={db} />, document.getElementById("root"));

export { App };
