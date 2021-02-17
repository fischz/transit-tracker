import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { ToggleSwitch, ToggleSwitchLabel } from "../shared.styles";
import {
  Container,
  ContentWrapper,
  Header,
  HeaderBadge,
  HeaderItem,
  HeaderLeft,
  HeaderLink,
  HeaderLogo,
  HeaderRight,
  HeaderSeperator,
  NightModeIndicator,
} from "./Layout.styles";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

  const {state, dispatch} = useContext(AppContext);
  const handleNightModeSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      console.log(ev.target.checked);
      dispatch({type: 'setTheme', nightMode: ev.target.checked})
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderLink to="/"><HeaderLogo src='/logo192-transparent.png'/></HeaderLink>
          <HeaderBadge><HeaderLink to="/">Transit Tracker</HeaderLink></HeaderBadge>
        </HeaderLeft>
        {/*<HeaderSeperator />
        <HeaderItem>
          <HeaderLink to="/">Home</HeaderLink>
        </HeaderItem>*/}
        <HeaderRight>
          <HeaderItem><NightModeIndicator src={state.nightMode? '/moon.svg': '/sun.svg'} alt={state.nightMode? 'night mode is enabled': 'night mode is disabled'}/></HeaderItem>
          <HeaderItem><ToggleSwitch type='checkbox' id='nightmodeswitch' onChange={(ev) => {handleNightModeSwitchChange(ev)}} checked={state.nightMode}/><ToggleSwitchLabel htmlFor='nightmodeswitch'>Night Mode</ToggleSwitchLabel></HeaderItem>
        </HeaderRight>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;
