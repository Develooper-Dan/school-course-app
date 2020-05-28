import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

export const Context = React.createContext();
/*The Provider class component persists a users authentication status over the entire app.
It also defines all necessary methods to be consumed by the appropriate components.
*/
export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state= {
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this)
  }
/*Components with any form of input field use this method to keep track of the input values by storing them
in their their respective local states.
*/
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
/*All components which have to make requests to the api for whatever reason use this method
which utilizes the axios package. It takes options like the url, method to use and other stuff as parameters
as well as a reference to the component which calls it.
*/
  handleRequest(options, caller){
    return(
      axios({
        ...options,
        baseURL: 'http://localhost:5000/api'
      })
        .then(response => {
          //all exisiting validation errors are deleted since the request would eventually throw new ones anyway
          if(caller.state.errors){
            caller.setState({errors: null})
          }
          //if the server sends back any data the components main state gets updated
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
            /*we don't want to track the error state of a single component globally so... (this is necessary because
            the method for signing in defined below uses this method with reference to "this" to set the global state,
            but the errors should be handled locally )
            */
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
            //The detailed error response gets logged to the console
            console.error(message, "\n", error.response);
            return error.response;
          } else {
            //if there is no error.response object that means a serverside error occured
              console.error(error);
              caller.props.history.replace("/error");
          }
        })
      )
  }
  /*Takes the users credentials and then calls handleRequest to get the users data back. If the credentials are valid,
  the user data is persisted as global state in this component and as a cookie using the js-cookie pakacge.
  */
  async signIn(email, password, caller){
    let requestOptions = { url: "/users", method: "get", auth: {username: email, password} }
    let{from} = caller.props.location.state || {from: "/"}
    const response = await this.handleRequest(requestOptions, this)
    if(response.status <400 ){
      this.setState(prevState => {
        return {
          authenticatedUser: { ...prevState.authenticatedUser, password }
        }
      });
      Cookies.set("authenticatedUser", this.state.authenticatedUser, {secure: false});
      caller.props.history.push(from);
    }
    else {
      caller.setState({errors: response.data.message})
      }
  }
//returns the JSX for validation errors to be displayed in the corresponding component
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
//JSX to wrap all subscribing components with this.props.chilren
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
