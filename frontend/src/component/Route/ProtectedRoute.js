import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ conpoment: Compoment, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(prop) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            return <Compoment {...prop} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
