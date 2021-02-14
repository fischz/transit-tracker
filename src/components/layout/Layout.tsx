import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  ContentWrapper,
  Header,
  HeaderBadge,
  HeaderItem,
  HeaderLink,
  HeaderSeperator,
} from "./Layout.styles";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header>
        <HeaderBadge>TTC Updates</HeaderBadge>
        <HeaderSeperator />
        <HeaderItem>
          <HeaderLink to="/">Home</HeaderLink>
        </HeaderItem>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;
