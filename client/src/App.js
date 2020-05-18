import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
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

            <PrivateRoute path="/courses/create" component= {CreateCourse} />

            <PrivateRoute path="/courses/:id/update" component= {UpdateCourse} />

            <Route path="/courses/:id" component= {CourseDetail} />

            <Route path="/signup" component= {UserSignUp} />


            <Route path="/signin" component= {UserSignIn} />

            <Route path="/signout" component= {UserSignOut} />

            <Route path="*" component= {Error} />
          </Switch>
        </div>
      </Router>
  )}
}
export default App;
