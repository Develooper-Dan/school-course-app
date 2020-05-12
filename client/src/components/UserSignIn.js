import React, { Component } from 'react';
import {Consumer} from '../Context';

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state= {
      userInput: {}
    };
  }


  render(){
    return(
      <Consumer>
        {context => {
          let updateInput = context.actions.updateInput.bind(this);
          let signIn = context.actions.signIn;
          let {emailAddress, password} = this.state.userInput;
          return(
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <form onSubmit={(e) => {e.preventDefault(); signIn(emailAddress, password)}}>
                    <div>
                      <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange= {updateInput}/>
                    </div>
                    <div>
                      <input id="password" name="password" type="password" placeholder="Password" onChange= {updateInput}/>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign In</button>
                      <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push("/")}}>Cancel</button>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
              </div>
            </div>
          )
        }}
      </Consumer>
    )}
}

  export default UserSignIn;
