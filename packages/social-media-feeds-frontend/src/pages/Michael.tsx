import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { michael } from "../data/michael";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserLinks } from "../downstream/UserLinks";
import { UserMetadata } from "../downstream/UserMetadata";

const Michael = (props: any) => (
  <Shell
    head={michael.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={michael.background}
    linkComponent={Link}
    {...props}
  >
    <Paper>
      <UserHeader {...michael.header} />
    </Paper>
    <Paper>
      <UserLinks links={michael.links} />
    </Paper>
    <Paper>
      <UserMetadata {...michael.metadata} />
    </Paper>
  </Shell>
);

export { Michael };
