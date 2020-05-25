import React from 'react';

// This component gets mounted if the user somehow requests a non-existing site
const Forbidden = (props) =>{
  let {history, location} = props
  let { from } = location.state || {from}
  return (
    <div className="bounds">
      <h1>Access denied</h1>
      <p>The access to the site or resource at <strong>{from.pathname}</strong> is restricted to registered users only. !</p>
      <button type="button" onClick={() => history.goBack()}>Back</button>
    </div>
  )
}
export default Forbidden
