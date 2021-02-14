import styled from "styled-components"

export const Container = styled.div`
    padding: ${props => props.theme.padding.m};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    display: flex;
    justify-content: space-between;
`