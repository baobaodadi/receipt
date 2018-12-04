/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
// import Receipt from './receipt/index.jsx';
import My from './component/My';
import All from './component/All';
import Confirm from './component/Confirm';
import Accept from './component/Accept';
import Record from './component/Record';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/my" component={My}/>
        <Route exact path="/all" component={All}/>
        <Route exact path="/confirm" component={Confirm}/>
        <Route exact path="/accept" component={Accept}/>
        <Route exact path="/record" component={Record}/>
        {/*<Redirect from="/" to="receipt"/>*/}
      </Switch>
    );
  }
}

export default Routes;