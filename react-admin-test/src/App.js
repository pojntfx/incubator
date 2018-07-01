import React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import ListPosts from "./views/post/ListPosts";
import EditPost from "./views/post/EditPost";
import CreatePost from "./views/post/CreatePost";
import UserList from "./views/UserList";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import Dashboard from "./views/Dashboard";
import authProvider from "./authProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue["A700"] },
    secondary: { main: blueGrey[900] }
  }
});

const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com");

export default () => (
  <Admin
    title="FDSB2"
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={theme}
  >
    <Resource
      name="posts"
      icon={PostIcon}
      list={ListPosts}
      edit={EditPost}
      create={CreatePost}
    />
    <Resource name="users" icon={UserIcon} list={UserList} />
  </Admin>
);
