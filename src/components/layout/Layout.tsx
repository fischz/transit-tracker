import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  ContentWrapper,
  Header,
  HeaderBadge,
  HeaderItem,
  HeaderLink,
  HeaderLogo,
  HeaderSeperator,
} from "./Layout.styles";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header>
        <HeaderLink to="/"><HeaderLogo src='/logo192-transparent.png'/></HeaderLink>
        <HeaderBadge><HeaderLink to="/">Transit Tracker</HeaderLink></HeaderBadge>
        {/*<HeaderSeperator />
        <HeaderItem>
          <HeaderLink to="/">Home</HeaderLink>
        </HeaderItem>*/}
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;
