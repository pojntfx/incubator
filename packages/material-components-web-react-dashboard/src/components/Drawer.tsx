import * as React from "react";
import "@material/drawer/dist/mdc.drawer.css";
import "@material/list/dist/mdc.list.css";

import {
  Drawer as DrawerTemplate,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent
} from "rmwc/Drawer";
import { List, ListItem } from "rmwc/List";

interface IDefaultLayoutDrawer {
  open: boolean;
}

const Drawer = ({ open, ...otherProps }: IDefaultLayoutDrawer) => (
  <DrawerTemplate dismissible={true} open={open} {...otherProps}>
    <DrawerHeader>
      <DrawerTitle>Identity</DrawerTitle>
      <DrawerSubtitle>Version 0.0.1-0</DrawerSubtitle>
    </DrawerHeader>
    <DrawerContent>
      <List>
        <ListItem activated={true}>Organisations</ListItem>
        <ListItem>Roles</ListItem>
        <ListItem>Users</ListItem>
      </List>
    </DrawerContent>
  </DrawerTemplate>
);

export { Drawer };
