import React, { Component } from 'react';
import {NavLink} from "react-router-dom"

function Header(){
  return(
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/signin'>Sign In</NavLink>
        </nav>
      </div>
    </div>
  )
}

  export default Header;
