import * as React from "react";
import { Shell, IShellProps, Paper } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { felix } from "../data/felix";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { UserHeader } from "../downstream/UserHeader";
import { UserMetadata } from "../downstream/UserMetadata";
import { UserLinks } from "../downstream/UserLinks";
import { ActivityFeed } from "../downstream/ActivityFeed";

const Felix = (props: any) => (
  <Shell
    head={felix.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={felix.background}
    linkComponent={Link}
    {...props}
  >
    <Paper>
      <UserHeader {...felix.header} />
    </Paper>
    <Paper>
      <UserLinks links={felix.links} />
    </Paper>
    <Paper>
      <UserMetadata {...felix.metadata} />
    </Paper>
    <Paper>
      <h2>Activity</h2>
      <ActivityFeed {...felix.activityFeed} />
    </Paper>
  </Shell>
);

export { Felix };
