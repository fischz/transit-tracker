import styled, { createGlobalStyle } from "styled-components";

export const InputGroup = styled.div`
  padding: ${(props) => props.theme.padding.m};
  display: flex;
  & span {
    margin-right: ${(props) => props.theme.margin.m};
  }
  & input {
  }
`;

export const ToggleSwitch = styled.input`
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  visibility: hidden;

  &:checked + label {
    background: ${(props) => props.theme.colors.foreground};
  }

  &:checked + label:after {
    left: calc(100% - 0.05em);
    transform: translateX(-100%);
  }
`;

export const ToggleSwitchLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 2em;
  height: 1em;
  background: ${(props) => props.theme.colors.foreground};
  display: block;
  border-radius: 3em;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0.05em;
    left: 0.05em;
    width: 0.9em;
    height: 0.9em;
    background: ${(props) => props.theme.colors.item};
    border-radius: 90px;
    transition: 0.3s;
  }

  &:active:after {
    width: 1.8em;
  }
`;

export const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
    }

    *.pop-fade-enter {
        opacity: 0.01;
        transform: translate(0, 200px);
    }

    *.pop-fade-enter-active{
        opacity: 1;
        transition: all 500ms;
        transform: translate(0, 0px);
    }

    *.pop-fade-exit{
        opacity: 1;
        transform: translate(0, 0px);
    }

    *.pop-fade-exit-active{
        opacity: 0.01;
        transition: all 500ms;
        transform: translate(0, 200px);
    }
`;
