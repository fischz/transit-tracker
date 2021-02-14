import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
`;

export const Header = styled.div`
  padding: ${(props) => props.theme.padding.m};
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.75);
`;

export const HeaderItem = styled.span`
  font-size: 1.5em;
  padding: ${(props) => props.theme.padding.s};
`;

export const HeaderBadge = styled(HeaderItem)`
  color: ${(props) => props.theme.colors.accent};
`;

export const HeaderLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  transition-property: color, background-color;
  transition-duration: 256ms;
  transition-timing-function: ease;

  &:visited,
  &:active,
  &:link {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
  }

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const HeaderSeperator = styled.span`
  height: 100%;
  margin-left: ${(props) => props.theme.margin.m};
  margin-right: ${(props) => props.theme.margin.m};
  border-right: 2px solid ${(props) => props.theme.colors.border};
`;

export const ContentWrapper = styled.div``;
