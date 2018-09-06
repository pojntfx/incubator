import * as React from "react";
import { DefaultLayout } from "../layouts/Default";
import { Button } from "../components/Button";

const Index = (props: any) => (
  <DefaultLayout dismissible={true} open={true} {...props}>
    <h1>Organisations</h1>
    <Button />
  </DefaultLayout>
);

export { Index };
