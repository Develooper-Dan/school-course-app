import React from 'react';
import { useHistory } from "react-router-dom";
import {Consumer} from '../Context';

function UserSignOut (){
  let history = useHistory();
  return(
    <Consumer>
      {context => {
        context.actions.signOut();
        history.push("/");
      }}
    </Consumer>
  )
}

  export default UserSignOut;
