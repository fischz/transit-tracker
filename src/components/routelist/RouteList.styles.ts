import { Link } from "react-router-dom";
import styled from "styled-components";

export const RouteLink = styled(Link)`
  display: block;
  padding: ${(props) => props.theme.padding.m};
  color: ${(props) => props.theme.colors};
  background-color: ${(props) => props.theme.colors.background};
  transition-property: color, background-color;
  transition-duration: 256ms;
  transition-timing-function: ease;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:active,
  &:link,
  &:visited {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;
