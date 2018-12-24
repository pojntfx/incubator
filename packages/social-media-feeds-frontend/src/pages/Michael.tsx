import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { michael } from "../data/michael";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Michael = (props: any) => (
  <Shell
    head={michael.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={michael.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Michael</h1>
    <i>Coming soon!</i>
  </Shell>
);

export { Michael };
