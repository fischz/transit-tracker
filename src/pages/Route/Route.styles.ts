import styled from "styled-components";

export const PageContainer = styled.div``;
export const RouteTitle = styled.div`
  font-size: 1.5em;
  padding: ${(props) => props.theme.padding.m};
  background: ${(props) => props.theme.colors.foreground};
`;

export const Wrapper = styled.div`
  padding: ${(props) => props.theme.padding.m};
`;

export const StopListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${(props) => props.theme.margin.m};

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SectionTitle = styled.div`
  font-size: 1.5em;
  margin: 0;
  padding-left: ${(props) => props.theme.padding.m};
  padding-right: ${(props) => props.theme.padding.m};
  padding-bottom: ${(props) => props.theme.padding.m};
  padding-top: ${(props) => props.theme.padding.m};
  background: ${(props) => props.theme.colors.foreground};
  border-bottom: 0px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
`;

export const SectionSubtitle = styled.div`
  font-size: 1em;
  margin: 0;
  padding-left: ${(props) => props.theme.padding.m};
  padding-right: ${(props) => props.theme.padding.m};
  padding-bottom: ${(props) => props.theme.padding.m};
  background: ${(props) => props.theme.colors.foreground};
  border-bottom: 0px solid ${(props) => props.theme.colors.border};
`;
