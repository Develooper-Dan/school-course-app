import React, { Component } from 'react';
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: []
    };
  }

  handleRequest= (url, method) => {
      axios({
        method,
        url,
        baseURL: 'http://localhost:5000/api/'
      })
        .then(courses => {
            this.setState({courseList: courses.data})
        })
        .catch(error => {
          console.error('Error fetching and parsing data', error.toJSON());
        });
    }


  componentDidMount(){
    this.handleRequest("courses/", "get")
  }

  createCourseLayout(courses){
    return courses.map(course =>
      <div className="grid-33">
        <a className="course--module course--link" href={`courses/${course.id}`}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </a>
      </div>
    );
  }

  render(){
    return(
      <div className="bounds">
        {this.createCourseLayout(this.state.courseList)}
        <div className="grid-33">
          <a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </a>
        </div>
      </div>
  )}
}
  export default Courses;
