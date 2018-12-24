import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { nette } from "../data/nette";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Nette = (props: any) => (
  <Shell
    head={nette.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={nette.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Nette</h1>
    <i>Coming soon!</i>
  </Shell>
);

export { Nette };
