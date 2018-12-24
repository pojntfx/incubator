import * as React from "react";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { navbar } from "../data/navbar";
import { home } from "../data/home";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { footer } from "../data/footer";
import { Link } from "../downstream/Link";

const Home = (props: any) => (
  <Shell
    head={home.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={home.background}
    linkComponent={Link}
    segment
    {...props}
  >
    <h1>Die Hirschkopfbande grüßt alle "Fans!"</h1>
    <p>
      Herzlich willkommen auf unserer Website. Hier finden sich alle
      Informationen rund um ums!
    </p>
  </Shell>
);

export { Home };
