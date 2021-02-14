import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from './App.styles';
import { GlobalStyle } from './components/shared.styles';

import routes from './routes'
import { theme } from './theme';

function App() {

  return (
    <AppContainer className="App">
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
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
    </AppContainer>
  );
}

export default App;
