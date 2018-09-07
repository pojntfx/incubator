import * as React from "react";
import { DrawerAppContent } from "rmwc/Drawer";
import { Drawer } from "../components/Drawer";

const open = true;

const DefaultLayout = ({ children, ...otherProps }: any) => (
  <>
    <Drawer open={open} />
    <DrawerAppContent {...otherProps}>{children}</DrawerAppContent>
  </>
);

export { DefaultLayout };
