import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from '../Context';
// Higher-order component which protects its components from being accessed by unauthenticated users
export default function PrivateRoute({component: Component, ...props}){
  return (
    <Consumer>
      {context => (
        <Route {...props} render={props => {
          if(context.authenticatedUser){
            return (
              <Component {...props} />
            )
          } else {
            return(
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location.pathname }
                }}
              />
            )}
        }} />
      )}
    </Consumer>
  )
}
