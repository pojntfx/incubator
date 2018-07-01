import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

export default props => (
  <List title="All Users" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
