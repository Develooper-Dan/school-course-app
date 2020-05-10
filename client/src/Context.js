import React, { Component } from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state= {
      authenticatedUser: {}
    };
  }

  updateInput(e) {
    e.persist();
    this.setState( prevState => {
      let key = e.target.name;
      return {
        course: {
          ...prevState.course,
          [key]: e.target.value
        }
      }
    })
  }

  handleRequest(url, method, data, withCredentials=false){
    // if(withCredentials){
    //
    // }
      axios({
        method,
        url,
        data,
        withCredentials,
        auth,
        baseURL: 'http://localhost:5000/api'
      })
        .then(request => {
          let key = Object.keys(this.state)[0]
            method === 'delete' ? this.setState({[key]: {}})
            : this.setState({[key]: request.data})
        })
        .catch(error => {
          if(error.response){
          console.error(error.response.data.message, error.response);
          } else {
          console.error(error);
          }
        });
  }

  signIn(email, password){
    this.handleRequest('/users', 'get,' {email, password})
  }


  render(){
    return(
      <Context.Provider  value= {
        {
          actions: {handleRequest:this.handleRequest, updateInput: this.updateInput},
          state: this.state
        }
      } >
      {this.props.children}
      </Context.Provider>
    )
  }




}

export const Consumer = Context.Consumer;
