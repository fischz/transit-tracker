import styled, { createGlobalStyle } from "styled-components"

export const InputGroup = styled.div`
    padding: ${props => props.theme.padding.m};
    display: flex;
    & span {
        margin-right: ${props => props.theme.margin.m};
    }
    & input {

    }
`

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
`