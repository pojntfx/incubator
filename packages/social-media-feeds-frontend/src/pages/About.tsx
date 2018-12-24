import * as React from "react";
import Readme from "../../README.md";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { about } from "../data/about";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const About = (props: any) => (
  <Shell
    head={about.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={about.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <Readme />
  </Shell>
);

export { About };
