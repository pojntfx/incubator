import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { toni } from "../data/toni";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Toni = (props: any) => (
  <Shell
    head={toni.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={toni.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Toni</h1>
    <i>Coming soon!</i>
  </Shell>
);

export { Toni };
