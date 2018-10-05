import * as React from "react";
import { render } from "react-dom";
import { default as low } from "lowdb";
import { default as LocalStorage } from "lowdb/adapters/LocalStorage";
import "./scss/main.scss";
import { App } from "./components/App";

const adapter = new LocalStorage("db");
const db = low(adapter);

db.defaults({
  settingsAreOpen: true,
  username: "",
  password: "",
  listEndpoint: "http://localhost:3000/list",
  staticEndpoint: "http://localhost:4000",
  dsbEndpoint: "https://www.dsbmobile.de/Login.aspx"
}).write();

render(
  <App endpoint="http://localhost:3000/list?endpoint=https://www.dsbmobile.de/Login.aspx&staticendpoint=http://localhost:4000&username=296501&password=vplan2018" />,
  document.getElementById("root")
);

export { App };
