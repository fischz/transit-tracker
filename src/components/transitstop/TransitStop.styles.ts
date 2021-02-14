import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) => props.theme.padding.m};
  border-radius: 5px;
  height: auto;
  background: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.text};
`;

export const PredictionsContainer = styled.div`
  margin-bottom: ${(props) => props.theme.margin.m};
`;

export const Header = styled.div`
  width: 100%;
  font-size: 1.5em;
  overflow: hidden;
  height: 3em;
  vertical-align: bottom;
  border-bottom: 1px solid ${(props) => props.theme.colors.accent};
  margin-bottom: ${(props) => props.theme.padding.m};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const SubHeader = styled(Header)`
  font-size: 1em;
  height: auto;

  border-bottom: 0;
`;

export const CloseButton = styled.button`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  background: none;
  border: 0;
  opacity: 0.5;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    opacity: 1;
  }
`;
interface ToggleButtonProps {
  enabled: boolean;
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.padding.s};
  border: 0;
  height: auto;
  background-color: ${(props) =>
    props.enabled ? props.theme.colors.accent : props.theme.colors.item};
  transition-property: color, background-color;
  transition-duration: 256ms;
  transition-timing-function: ease;
  &:hover {
    outline: none;
    background-color: ${(props) => props.theme.colors.accent};
  }
  &:not(:first-child) {
    margin-left: ${(props) => props.theme.margin.m};
  }
`;

interface CollapsibleProps {
  open: boolean;
  height?: string;
}

export const Collapsible = styled.div<CollapsibleProps>`
  max-height: ${(props) => (props.open ? "100vh" : "0vh")};
  height: auto;
  overflow-y: hidden;
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: linear;
`;

export const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
`;
