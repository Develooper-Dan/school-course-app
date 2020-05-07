import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {NavLink} from "react-router-dom";
import axios from 'axios';

class CourseDetail extends Component {
    state = {
      course: null
    };

  handleRequest(url, method){
      axios({
        method,
        url,
        baseURL: 'http://localhost:5000/api'
      })
        .then(course => {
            method === 'delete' ? this.setState({course: {}})
            : this.setState({course: course.data})
        })
        .catch(error => {
          console.error('Error fetching and parsing data', error.toJSON());
        });
    }

  componentDidMount(){
    let {id} = this.props.match.params;
    this.handleRequest(`/courses/${id}`, "get")
  }

render(){
  let {course} = this.state;
  if(course){
    let {User} = course;
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
              <NavLink className="button" to={{pathname: `/courses/${course.id}/update`, state: this.state}}>Update Course</NavLink>
              <button className="button" onClick={() => this.handleRequest(`/courses/${course.id}`, "delete")}>Delete Course</button>
              </span>
              <a className="button button-secondary" href="/">Return to List</a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {User.firstName} {User.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={course.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
    }
  }
}
  export default CourseDetail;
