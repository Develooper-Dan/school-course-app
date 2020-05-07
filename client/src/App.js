import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import Error from "./components/Error";


class App extends Component {


  render(){
    return(
      <Router>
        <div>
          <Header />
          <hr />
          <Switch>
          <Route exact path="/" >
            <Courses />
          </Route>
          <Route path="/courses/create">
          </Route>

          <Route path="/courses/:id/update" component= {UpdateCourse} />

          <Route path="/courses/:id" component= {CourseDetail} />


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
