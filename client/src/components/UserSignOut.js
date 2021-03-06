import React from 'react';
import { useHistory } from "react-router-dom";
import {Consumer} from '../Context';

// Doesn't actually render a component but instead redirects a user after logging out
function UserSignOut (){
  let history = useHistory();
  return(
    <Consumer>
      {context => {
        context.actions.signOut();
        history.replace("/");
      }}
    </Consumer>
  )
}

  export default UserSignOut;
