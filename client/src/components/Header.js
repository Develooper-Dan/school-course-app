import React from 'react';
import {NavLink, useHistory} from "react-router-dom"
import {Consumer} from '../Context';

function Header(){
  let history = useHistory();
  return(
    <Consumer>
      {context => {
        let navElements;
        if(context.authenticatedUser){
          let {firstName, lastName} = context.authenticatedUser;
          navElements = (
            <nav>
              <span>Welcome, {firstName} {lastName}!</span>
              <NavLink to='/signout'>Sign Out</NavLink>
            </nav>
          )
        } else {
          navElements = (
            <nav>
              <NavLink to='/signup'>Sign Up</NavLink>
              <NavLink to={{
                pathname: "/signin",
                state: { from: history.location.pathname }
              }}>Sign In</NavLink>
            </nav>
          )
        }

        return(
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
                {navElements}
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}

export default Header;
