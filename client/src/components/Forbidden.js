import React from 'react';

// This component gets mounted if the user somehow requests a non-existing site
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
