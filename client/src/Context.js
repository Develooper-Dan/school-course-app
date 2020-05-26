import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

export const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state= {
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this)
  }

  updateInput(e) {
    e.persist();
    this.setState( prevState => {
      let state = (Object.keys(prevState)[0])
      let key = e.target.name;
      return {
        [state]: {
          ...prevState[state],
          [key]: e.target.value
        }
      }
    })
  }

  handleRequest(options, caller){
    return(
      axios({
        ...options,
        baseURL: 'http://localhost:5000/api'
      })
        .then(response => {
          if(response.status < 400 && response.data){
            let key = Object.keys(caller.state)[0];
            caller.setState({[key]: response.data});
          }
          return response;
        })
        .catch(error => {
          if(error.response){
            let {message} = error.response.data;
            let from = caller.props.location;

            if(!Object.is(caller, this)){
              caller.setState({errors: message})
            }
            if(Array.isArray(message)){
              message = message.join("\n")
            }
            switch(error.response.status){
              case 404:
              caller.props.history.replace("/notfound", {from});
              break;

              case 403:
              caller.props.history.replace("/forbidden", {from});
              break;
            }

            console.error(message, "\n", error.response);
            return error.response;
          } else {
              console.error(error);
              caller.props.history.replace("/error");
          }
        })
      )
  }

  async signIn(email, password, caller){
    let requestOptions = { url: "/users", method: "get", auth: {username: email, password} }
    const response = await this.handleRequest(requestOptions, this)
    if(response.status <400 ){
      this.setState(prevState => {
        return {
          authenticatedUser: { ...prevState.authenticatedUser, password }
        }
      });
      Cookies.set("authenticatedUser", this.state.authenticatedUser, {secure: false});
      return response;
    }
    else {
      caller.setState({errors: response.data.message})
      }
  }

createErrors(errors){
  if(errors){
    let errorList = <li>{errors}</li>
    if(Array.isArray(errors)){
        errorList = errors.map(error => <li key={errors.indexOf(error)}>{error}</li>);
    }
    return(
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errorList}
          </ul>
        </div>
      </div>
    )
  } else {
    return null
  }
}

  signOut(){
    this.setState({authenticatedUser: null});
    Cookies.remove("authenticatedUser")
  }

  render(){
    return(
      <Context.Provider  value= {
        {
          actions: {
            handleRequest: this.handleRequest,
            updateInput: this.updateInput,
            signIn: this.signIn,
            signOut: this.signOut,
            createErrors: this.createErrors
          },
          authenticatedUser: this.state.authenticatedUser
        }
      } >
      {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
