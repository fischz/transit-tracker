import React, { Dispatch, useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { AppContainer } from "./App.styles";
import { GlobalStyle } from "./components/shared.styles";

import routes from "./routes";
import { darkTheme, lightTheme } from "./theme";




interface State {
  nightMode: boolean;
}

const initialState: State = {
  nightMode: true
}

type Action = 
  | {type: 'setTheme', nightMode: boolean}
  | {type: 'setLocation'};

const AppReducer = (state: State, action: Action): State => {
  switch (action.type){
    case 'setTheme':
        return {...state, nightMode: action.nightMode}
    case 'setLocation':
      return state;
  } 
}

export const AppContext = React.createContext<{state: State, dispatch: Dispatch<Action>}>({
  state: initialState,
  dispatch: () => null
})

//const AppContext = React.createContext<Context>(DefaultContext)

function App() {

  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <AppContainer className="App">
      <GlobalStyle />
        <AppContext.Provider value={{state, dispatch}}>
        <ThemeProvider theme={state.nightMode? darkTheme: lightTheme}>
          <Router>
            <Switch>
              {routes.map((route) => (
                <Route
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              ))}
            </Switch>
          </Router>
        </ThemeProvider>
        </AppContext.Provider>
    </AppContainer>
  );
}

export default App;
