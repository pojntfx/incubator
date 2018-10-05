import * as React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => (
  <NavbarWrapper className="my-3">
    <Button variant="outline-primary" className="mr-auto">
      Settings
    </Button>
    <Button variant="outline-primary" className="ml-auto">
      Logout
    </Button>
  </NavbarWrapper>
);

export { Navbar };
