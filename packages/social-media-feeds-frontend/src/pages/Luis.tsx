import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { luis } from "../data/luis";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserLinks } from "../downstream/UserLinks";
import { UserMetadata } from "../downstream/UserMetadata";

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
    <Paper>
      <UserHeader {...luis.header} />
    </Paper>
    <Paper>
      <UserLinks links={luis.links} />
    </Paper>
    <Paper>
      <UserMetadata {...luis.metadata} />
    </Paper>
  </Shell>
);

export { Luis };
