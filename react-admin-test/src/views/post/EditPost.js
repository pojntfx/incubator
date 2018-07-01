import React from "react";
import {
  Edit,
  SimpleForm,
  DisabledInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  LongTextInput
} from "react-admin";

export default props => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="body" />
    </SimpleForm>
  </Edit>
);

const PostTitle = ({ record }) => (
  <span>Post {record ? `"${record.title}"` : ""}</span>
);
