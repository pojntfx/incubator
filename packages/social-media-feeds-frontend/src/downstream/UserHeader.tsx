import * as React from "react";
import { Grid, Image, Header } from "semantic-ui-react";
import { Link } from "./Link";
import { Button } from "@libresat/frontend-components";

interface IUserHeader {
  img: string;
  name: string;
  handle: string;
  text: string;
  mail: string;
  follow: string;
}

const UserHeader = ({
  img,
  name,
  handle,
  text,
  mail,
  follow,
  ...otherProps
}: IUserHeader) => (
  <Grid columns="equal" stackable stretched {...otherProps}>
    <Grid.Column width={3}>
      <Image circular centered src={img} />
    </Grid.Column>
    <Grid.Column>
      <Header as="h1">
        <Grid columns="equal" stackable verticalAlign="middle">
          <Grid.Column>
            <Header.Content>
              {name}
              <Header.Subheader>@{handle}</Header.Subheader>
            </Header.Content>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Link to={follow}>
              <Button icon="add" content="Follow" primary />
            </Link>
            <Link to={`mailto:${mail}`}>
              <Button icon="mail" content="Contact" secondary />
            </Link>
          </Grid.Column>
        </Grid>
      </Header>
      <p>{text}</p>
    </Grid.Column>
  </Grid>
);

export { UserHeader };
