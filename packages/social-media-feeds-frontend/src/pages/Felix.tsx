import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { felix } from "../data/felix";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Felix = (props: any) => (
  <Shell
    head={felix.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={felix.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Felix</h1>
    <i>Coming soon!</i>
  </Shell>
);

export { Felix };
