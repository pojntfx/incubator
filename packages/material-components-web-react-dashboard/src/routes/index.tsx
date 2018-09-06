import * as React from "react";
import { DefaultLayout } from "../layouts/Default";
import { Button } from "../components/Button";

const Index = (props: any) => (
  <DefaultLayout {...props}>
    <h1>Dashboard</h1>
    <Button />
  </DefaultLayout>
);

export { Index };
