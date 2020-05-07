import React, { Component } from 'react';
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: []
    };
    this.handleRequest= this.props.handleRequest.bind(this)
  }

  // handleRequest= (url, method) => {
  //     axios({
  //       method,
  //       url
  //     })
  //       .then(courses => {
  //           this.setState({courseList: courses.data})
  //       })
  //       .catch(error => {
  //         console.error('Error fetching and parsing data', error.toJSON());
  //       });
  //   }


  componentDidMount(){
    this.handleRequest("http://localhost:5000/api/courses/", "get", "courseList")
  }

  render(){
    console.log(this.state.courseList);
    return(
      <div className="bounds">

        <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
        </div>
  )}
}
  export default Courses;