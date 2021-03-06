import React, { Component } from 'react';
import {Consumer} from '../Context';

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state= {
      course: {}
    };
  }

  render(){
    return(
      <Consumer>
        {context => {
          let {course} = this.state;
          let updateInput = context.actions.updateInput.bind(this);
          let handleRequest = context.actions.handleRequest;
          let {emailAddress, password, firstName, lastName} = context.authenticatedUser;
          let requestOptions = { url: "/courses", method: "post", data: course, auth: {username: emailAddress, password} }
          return(
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              {/* if there are any errors, they ould be displayed here */}
              {context.actions.createErrors(this.state.errors)}
              {/* if the course was posted successfully the user gets redirected to the main route*/}
              <form onSubmit={(e) => {e.preventDefault(); handleRequest(requestOptions, this)
                .then( response => {
                  if(response.status < 400){
                    this.props.history.push("/");
                  }
                })
              }}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        onChange= {updateInput} />
                    </div>
                    <p>By {firstName} {lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea id="description" name="description" placeholder="Course description..." onChange= {updateInput}></textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" onChange= {updateInput} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange= {updateInput}></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Create Course</button>
                  <button className="button button-secondary" onClick= {(e) => {
                    e.preventDefault(); this.props.history.push("/")
                    }} > Cancel </button>
                </div>
              </form>
            </div>
          )
        }}
      </Consumer>
  )}
}

export default CreateCourse;
