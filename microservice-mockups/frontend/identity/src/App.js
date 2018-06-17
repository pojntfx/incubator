import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import { MainNavigation } from "./components/MainNavigation";
import { UserList } from "./components/UserList";
import { Container } from "semantic-ui-react";

injectGlobal`
#root {
  background: url("https://images.unsplash.com/photo-1506748566756-07746caecd61?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=039d9907aa46de1be3b58be0d9734513&auto=format&fit=crop&w=1268&q=80")!important;
  background-size: cover!important;
  min-height: 100%;
}

`;

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <MainNavigation />
        <UserList />
      </MainWrapper>
    );
  }
}

const MainWrapper = styled(Container)`
  padding-top: 1em;
  padding-bottom: 1em;
`;

export default App;
