import React, { Component } from 'react';
import {Context} from '../Context';
import {NavLink} from "react-router-dom"

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: []
    };
  }

//gets all courses from the db
  componentDidMount(){
    let handleRequest = this.context.actions.handleRequest
    let requestOptions = { url: "/courses", method: "get" }
    handleRequest(requestOptions, this)
  }
//Returns the individual JSX for each course contained in this.state.courseList
  createCourseLayout(courses){
    return courses.map(course =>
      <div key={course.id} className="grid-33">
        <NavLink className="course--module course--link" to={`courses/${course.id}`}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </NavLink>
      </div>
    );
  }

  render(){
    return(
      <div className="bounds">
        {this.createCourseLayout(this.state.courseList)}
        <div className="grid-33">
          <NavLink className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </NavLink>
        </div>
      </div>
  )}
}

Courses.contextType = Context
export default Courses;
