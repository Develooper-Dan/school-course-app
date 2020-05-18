import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from '../Context';

export default function PrivateRoute({component: Component, ...props}){
  return (
    <Consumer>
      {context => (
        <Route {...props} render={props => {
          if(context.authenticatedUser){
            return (
              <Component context= {context} routeProps= {props} />
            )
          } else {
            return(
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )}
        }} />
      )}
    </Consumer>
  )
}
