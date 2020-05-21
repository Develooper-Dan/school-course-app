import React, { Component } from 'react';
import {Consumer} from '../Context';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.routeProps.location.state;
  }


render(){
  return(
    <Consumer>
      {context => {
        let {course} = this.state;
        let {User} = course;
        let {emailAddress, password} = context.authenticatedUser;
        let updateInput = context.actions.updateInput.bind(this);
        let handleRequest = context.actions.handleRequest
        let requestOptions = { url: `/courses/${course.id}`, method: "put", data: course, auth: {username: emailAddress, password} }
      return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {context.actions.createErrors(this.state.errors)}
          <form onSubmit={(e) => {e.preventDefault(); handleRequest(requestOptions, this) }}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={course.title} onChange= {updateInput}/>
                </div>
                <p>By {User.firstName} {User.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" placeholder="Course description..." value={course.description} onChange= {updateInput}>
                  </textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={course.estimatedTime} onChange= {updateInput} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={course.materialsNeeded} onChange= {updateInput}>
                    </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.routeProps.history.push(`/courses/${course.id}`)}}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
  )}}
  </Consumer>
  )}
}
  export default UpdateCourse;
