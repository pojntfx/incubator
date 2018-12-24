import * as React from "react";
import { Grid, Image, Header } from "semantic-ui-react";
import { Link } from "./Link";
import { Button, Help } from "@libresat/frontend-components";
import { LinksWrapper } from "./LinksWrapper";
import { IHelp } from "@libresat/frontend-components/dist/types";

interface IBadge {
  title: string;
  img: string;
  link: string;
  help: IHelp;
}

interface IUserHeader {
  img: string;
  name: string;
  handle: string;
  text: string;
  mail: string;
  follow: string;
  links: IBadge[];
}

const UserHeader = ({
  img,
  name,
  handle,
  text,
  mail,
  follow,
  links
}: IUserHeader) => (
  <>
    <Grid columns="equal" stackable stretched>
      <Grid.Column width={4}>
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
        <LinksWrapper>
          {links.map((link, index) => (
            <Link to={link.link} key={index}>
              <Help {...link.help}>
                <img src={link.img} alt={link.title} />
              </Help>
            </Link>
          ))}
        </LinksWrapper>
      </Grid.Column>
    </Grid>
  </>
);

export { UserHeader };
