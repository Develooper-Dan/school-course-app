import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   photos: [],
    //   loading: false
    // }
  }

// handleRequest= () => {
//     axios.get("http://localhost:5000/api/courses/")
//       .then(response => {
//           response.data.map( course => {
//             return <li>{course.title}</li>
//         })
//       })
//       .catch(error => {
//         console.error('Error fetching and parsing data', error.toJSON());
//       });
//   }

  render(){
    return(
    <div className="container">
      <Router>
        <Switch>
        <Route exact path="/">

        </Route>
        </Switch>
      </Router>
    </div>
  )}
}
export default App;
