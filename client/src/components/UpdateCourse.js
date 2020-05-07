import React, { Component } from 'react';
import axios from 'axios';

class UpdateCourse extends Component {
  state = {
    titleInput: "",

  };

  updateInput= (e) => {
    this.setState({searchInput: e.target.value})
  }

  handleRequest(url, method, data){
      axios({
        method,
        url,
        data,
        baseURL: 'http://localhost:5000/api'
      })
        .then(course => {
            method === 'delete' ? this.setState({course: {}})
            : this.setState({course: course.data})
        })
        .catch(error => {
          console.error('Error fetching and parsing data', error.response);
        });
    }


render(){
  let {course} = this.props.location.state;
  return(
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                  value={course.title} /></div>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <div>
                <textarea id="description" name="description" className="" placeholder="Course description..." value={course.description}>
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
                      placeholder="Hours" value={course.estimatedTime} />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                  <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={course.materialsNeeded}>
                  </textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
          <button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.handleRequest(`/courses/${course.id}`, "put")}}>Update Course</button>
          <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.goBack()}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )}
}
  export default UpdateCourse;
