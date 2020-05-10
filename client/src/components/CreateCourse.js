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
          let updateInput = context.actions.updateInput.bind(this);
          let handleRequest = context.actions.handleRequest
          return(
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <form onSubmit={(e) => {e.preventDefault(); handleRequest(`/courses`, "post", this.state)}}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        onChange= {updateInput} />
                    </div>
                    <p>By ...</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea id="description" name="description" className="" placeholder="Course description..." onChange= {updateInput}></textarea>
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
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange= {updateInput}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Create Course</button>
                  <button className="button button-secondary" onClick= {(e) => {e.preventDefault(); this.props.history.push("/")}}>Cancel</button>
                </div>
              </form>
            </div>
          )
        }}
      </Consumer>
  )}
}

export default CreateCourse;