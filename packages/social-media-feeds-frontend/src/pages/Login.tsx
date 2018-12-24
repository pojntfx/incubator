import * as React from "react";
import { Shell, IShellProps, Button } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { login } from "../data/login";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";
import { Grid } from "semantic-ui-react";

const Login = (props: any) => (
  <Shell
    head={login.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={login.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Login</h1>
    <p>
      Getreu{" "}
      <Link to="https://en.wikipedia.org/wiki/Free_Software%2C_Free_Society">
        Free Software, Free Society
      </Link>{" "}
      nutzen wir diverse freie Dienste.
    </p>
    <Grid columns="equal" stackable stretched>
      <Grid.Column>
        <h2>Cloud</h2>
        <p>
          Die Pojtingers haben eine Nextcloud über welche jegliche kollaborative
          oder organisatorische Arbeit durchgeführt werden kann.
        </p>
        <Link to="https://cloud.pojtinger.com">
          <Button fluid icon="cloud" content="Zur Nextcloud" primary />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <h2>Content Manager</h2>
        <p>
          Hier kann der Inhalt dieser Seite bearbeitet werden, ohne dass der
          Quellcode händisch verändert werden muss.
        </p>
        <Link to="/admin">
          <Button fluid icon="pencil" content="Zum Content Manager" secondary />
        </Link>
      </Grid.Column>
    </Grid>
  </Shell>
);

export { Login };
