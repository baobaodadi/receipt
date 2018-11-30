/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Receipt from './receipt/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/receipt" component={Receipt}/>
        <Redirect from="/" to="receipt"/>
      </Switch>
    );
  }
}

export default Routes;