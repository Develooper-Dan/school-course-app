import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from '../Context';

export default function PrivateRoute(WrappedComponent, ...props){
  return (
    <Consumer>
      {context => (
        <Route {...props} render={({location}) => {
          console.log(context.authenticatedUser)
          if(context.authenticatedUser){
            return (
              <WrappedComponent context= {context}/>
            )
          } else {
            return(
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location }
                }}
              />
            )}
        }} />
      )}
    </Consumer>
  )
}
