import * as React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface INavbarProps {
  children: JSX.Element[];
}

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = ({ children }: INavbarProps) => (
  <NavbarWrapper className="my-3">
    {children}
    <Button variant="outline-primary" className="ml-auto">
      Logout
    </Button>
  </NavbarWrapper>
);

export { Navbar };
