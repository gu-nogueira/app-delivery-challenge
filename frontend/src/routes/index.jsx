import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import ScrollToTop from './ScrollToTop';

/*
 *  Pages
 */

import Login from '../pages/Login';
import Deliveries from '../pages/Deliveries';
import DeliveriesNew from '../pages/Deliveries/new';

function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/deliveries" exact component={Deliveries} isPrivate />
        <Route path="/deliveries/new" component={DeliveriesNew} isPrivate />

        {/* 404 Page */}

        <Route path="*" component={() => <Redirect to="/deliveries" />} />
      </Switch>
    </>
  );
}

export default Routes;
