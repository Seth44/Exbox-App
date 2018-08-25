import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from "react-router-dom";
import store, { history } from './store'

import 'sanitize.css/sanitize.css'
import './index.css'
import indexRoutes from "./routes/index.js";

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
        <Redirect to='/'/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  target
)
