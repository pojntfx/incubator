import * as React from "react";
import { IHelp } from "@libresat/frontend-components/dist/types";
import { LinksWrapper } from "./LinksWrapper";
import { Link } from "./Link";
import { Help } from "@libresat/frontend-components";

interface IBadge {
  title: string;
  img: string;
  link: string;
  help: IHelp;
}

interface IUserLinks {
  links: IBadge[];
}

const UserLinks = ({ links, ...otherProps }: IUserLinks) => (
  <LinksWrapper {...otherProps}>
    {links.map((link, index) => (
      <Link to={link.link} key={index}>
        <Help {...link.help}>
          <img src={link.img} alt={link.title} />
        </Help>
      </Link>
    ))}
  </LinksWrapper>
);

export { UserLinks };
