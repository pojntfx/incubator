import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { nette } from "../data/nette";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserLinks } from "../downstream/UserLinks";
import { UserMetadata } from "../downstream/UserMetadata";

const Nette = (props: any) => (
  <Shell
    head={nette.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={nette.background}
    linkComponent={Link}
    {...props}
  >
    <Paper>
      <UserHeader {...nette.header} />
    </Paper>
    <Paper>
      <UserLinks links={nette.links} />
    </Paper>
    <Paper>
      <UserMetadata {...nette.metadata} />
    </Paper>
  </Shell>
);

export { Nette };
