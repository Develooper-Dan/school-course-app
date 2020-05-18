import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {NavLink} from "react-router-dom";
import {Context, Consumer} from '../Context';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null
    };
}

  componentDidMount(){
    let {id} = this.props.match.params;
    let requestOptions = { url: `/courses/${id}`, method: "get" }
    this.handleRequest = this.context.actions.handleRequest
    this.handleRequest(requestOptions, this)
  }

render(){
    return(
      <Consumer>
        {context => {
          let {course} = this.state;
          if(course){
            let {User} = course;
            let buttonElements;
            if(context.authenticatedUser && context.authenticatedUser.id === course.id){
              let {emailAddress, password} = context.authenticatedUser;
              let requestOptions = { url: `/courses/${course.id}`, method: "delete", auth: {username: emailAddress, password} }

              buttonElements =  (
                <span>
                  <NavLink className="button" to={{pathname: `/courses/${course.id}/update`, state: this.state}}>Update Course</NavLink>
                  <button className="button" onClick={() => {this.handleRequest(requestOptions,this); this.props.history.push("/")}}>Delete Course</button>
                </span>
              )
            }

            return(
            <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    {buttonElements}
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
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
      }}
    </Consumer>
    )
  }
}

CourseDetail.contextType = Context
export default CourseDetail;
