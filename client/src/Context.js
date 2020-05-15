import React, { Component } from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state= {
      authenticatedUser: null
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
    const response =
      axios({
        ...options,
        baseURL: 'http://localhost:5000/api'
      })
        .then(response => {
          if(response.status < 400){
            let key = Object.keys(caller.state)[0]
            response.request.method === 'delete' ? caller.setState({[key]: null})
            : caller.setState({[key]: response.data})
          }
        })
        .catch(error => {
          if(error.response){
          console.error(error.response.data.message, error.response);
          } else {
          console.error(error);
          }
        });
      return response
  }

  async signIn(email, password){
    let requestOptions = { url: "/users", method: "get", auth: {username: email, password} }
    this.handleRequest = this.handleRequest.bind(this)
    const response = await this.handleRequest(requestOptions, this)
    if(response){
      this.setState(prevState => {
        return {
          authenticatedUser: { ...prevState.authenticatedUser, password }
        }
      });
    }
  }

  signOut(){
    this.setState({authenticatedUser: null})
  }

  render(){
    return(
      <Context.Provider  value= {
        {
          actions: {handleRequest: this.handleRequest, updateInput: this.updateInput, signIn: this.signIn, signOut: this.signOut},
          authenticatedUser: this.state.authenticatedUser
        }
      } >
      {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
