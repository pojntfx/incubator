import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { toni } from "../data/toni";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserLinks } from "../downstream/UserLinks";
import { UserMetadata } from "../downstream/UserMetadata";

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
    <Paper>
      <UserHeader {...toni.header} />
    </Paper>
    <Paper>
      <UserLinks links={toni.links} />
    </Paper>
    <Paper>
      <UserMetadata {...toni.metadata} />
    </Paper>
  </Shell>
);

export { Toni };
