import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { felicitas } from "../data/felicitas";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";

const Felicitas = (props: any) => (
  <Shell
    head={felicitas.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={felicitas.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <UserHeader {...felicitas.header} />
  </Shell>
);

export { Felicitas };
