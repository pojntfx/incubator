import React from "react";
import { Admin } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com");

export default () => {
  return (
    <div>
      <Admin dataProvider={dataProvider} />
    </div>
  );
};
