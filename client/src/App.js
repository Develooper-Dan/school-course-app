import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./Header";
import Courses from "./Courses";
import Error from "./Error";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   photos: [],
    //   loading: false
    // }
  }

handleRequest= (url, method, stateName) => {
    axios({
      method,
      url
    })
      .then(courses => {
        this.setState({[stateName]: courses.data})
      })
      .catch(error => {
        console.error('Error fetching and parsing data', error.toJSON());
      });
  }

  render(){
    return(
      <Router>
        <div>
          <Header />
          <hr />
          <Switch>
          <Route exact path="/" >
            <Courses handleRequest ={this.handleRequest} />
          </Route>
          <Route path="/courses/create">
          </Route>

          <Route path="/courses/:id">
          </Route>

          <Route path="/courses/:id/update">
          </Route>

          <Route path="/signup">
          </Route>

          <Route path="/signin">
          </Route>

          <Route path="/signout">
          </Route>

          <Route path="*" component= {Error} />
          </Switch>
        </div>
      </Router>
  )}
}
export default App;
