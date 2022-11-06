import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import ScrollToTop from './ScrollToTop';

// ** Pages

import Deliveries from '../pages/Deliveries';
import DeliveriesNew from '../pages/Deliveries/new';
import DeliveriesEdit from '../pages/Deliveries/edit';

function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/deliveries/new" />}
        />
        <Route path="/deliveries" exact component={Deliveries} />
        <Route path="/deliveries/new" component={DeliveriesNew} />
        <Route path="/deliveries/:id" component={DeliveriesEdit} />

        {/* 404 Page */}

        <Route path="*" component={() => <Redirect to="/deliveries" />} />
      </Switch>
    </>
  );
}

export default Routes;
