import React, { Component } from 'react';
import {Consumer} from '../Context';
import {NavLink} from "react-router-dom"

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state= {
      user: {}
    };
  }

  render(){
    return(
      <Consumer>
        {context => {
          let updateInput = context.actions.updateInput.bind(this);
          let handleRequest = context.actions.handleRequest;
          let requestOptions = {url: "/users", method: "post", data: this.state}
          return(
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  <form onSubmit={(e) => {e.preventDefault(); handleRequest(requestOptions, this)}}>
                    <div>
                      <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange= {updateInput} />
                    </div>
                    <div>
                      <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange= {updateInput} />
                    </div>
                    <div>
                      <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange= {updateInput} />
                    </div>
                    <div>
                      <input id="password" name="password" type="password" className="" placeholder="Password" onChange= {updateInput}/>
                    </div>
                    <div>
                      <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange= {updateInput} />
                      </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign Up</button>
                      <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push("/")}}>Cancel</button>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
              </div>
            </div>
          )
        }}
      </Consumer>
    )}
  }

  export default UserSignUp;
