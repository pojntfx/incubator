import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { luis } from "../data/luis";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Luis = (props: any) => (
  <Shell
    head={luis.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={luis.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Luis</h1>
    <i>Coming soon!</i>
  </Shell>
);

export { Luis };
