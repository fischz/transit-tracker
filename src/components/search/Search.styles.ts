import styled from "styled-components"

export const SearchContainer = styled.div`
    padding: ${props => props.theme.padding.m};
`

export const SearchTextInput = styled.input`
    width: 100%;
    font-size: 1em;
    background: ${props => props.theme.colors.item};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fontFamily};
    border: 0;
    padding: ${props => props.theme.padding.m};
    &:focus {
        border: 0;
    }
`

export const SearchResultContainer = styled.div<{isEnabled: boolean}>`
    width: 100%;
    position: absolute;
    z-index: 1;
    background: ${props => props.theme.colors.foreground};
    display: ${props => props.isEnabled? 'block': 'none'};
`

export const SearchResult = styled.div`
    width: 100%;
    background: ${props => props.theme.colors.foreground};
    padding: ${props => props.theme.padding.m};
    transition-property: color, background-color;
    transition-duration: 256ms;
    transition-timing-function: ease; 

    &:hover {
        background: ${props => props.theme.colors.item};
        color: ${(props) => props.theme.colors.accent};
    }

`