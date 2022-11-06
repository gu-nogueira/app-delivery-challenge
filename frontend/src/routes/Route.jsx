import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// ** Layouts
import DefaultLayout from '../layouts/default';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const Layout = DefaultLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout url={props.location.pathname}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

/*
 *  propTypes definition
 */

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

/*
 *  defaultProps definition
 */

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
