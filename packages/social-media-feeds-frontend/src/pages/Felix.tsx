import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { felicitas } from "../data/felicitas";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserMetadata } from "../downstream/UserMetadata";
import { UserLinks } from "../downstream/UserLinks";

const Felicitas = (props: any) => (
  <Shell
    head={felicitas.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={felicitas.background}
    linkComponent={Link}
    {...props}
  >
    <Paper>
      <UserHeader {...felicitas.header} />
    </Paper>
    <Paper>
      <UserLinks links={felicitas.links} />
    </Paper>
    <Paper>
      <UserMetadata {...felicitas.metadata} />
    </Paper>
  </Shell>
);

export { Felicitas };
