import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
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

            <Route path="/forbidden" component= {Forbidden} />

            <Route path="/error" component= {Error} />

            <Route path="/notfound" component= {NotFound} />

            <Route path="*" render={({ location }) => (
              <Redirect to={{
                pathname: "/notfound",
                state: { from: location }
              }}/>
            )}/>

          </Switch>
        </div>
      </Router>
  )}
}
export default App;
