import React from 'react';

// This component gets mounted if the user is not the registered owner of a course he tries to update
const Forbidden = (props) =>{
  let {history} = props
  return (
    <div className="bounds">
      <h1>Access denied</h1>
      <p>You're not the registered owner of this course!</p>
      <button type="button" onClick={() => history.goBack()}>Back</button>
    </div>
  )
}
export default Forbidden
