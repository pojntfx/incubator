import * as React from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent,
  DrawerAppContent
} from "rmwc/Drawer";
import { List, ListItem } from "rmwc/List";
import "@material/drawer/dist/mdc.drawer.css";
import "@material/list/dist/mdc.list.css";

interface IDefaultLayoutDrawer {
  children: any;
  open: boolean;
  dismissible: boolean;
}

const DefaultLayout = ({
  children,
  open,
  dismissible,
  ...otherProps
}: IDefaultLayoutDrawer) => (
  <>
    <Drawer
      dismissible={dismissible}
      modal={!dismissible}
      open={open}
      {...otherProps}
    >
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
    </Drawer>
    {dismissible ? <DrawerAppContent>{children}</DrawerAppContent> : children}
  </>
);

export { DefaultLayout };
