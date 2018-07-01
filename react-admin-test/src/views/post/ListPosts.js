import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Filter,
  TextInput,
  ReferenceInput,
  SelectInput,
  Responsive,
  SimpleList
} from "react-admin";

export default props => (
  <List title="All Posts" filters={<PostFilter />} {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => record.body}
          tertiaryText={record => `ID: ${record.id}`}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <ReferenceField label="User" source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="title" />
          <TextField source="body" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const PostFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);
