import React from 'react';

// This component gets mounted if the user somehow requests a non-existing site
const UnhandledError = (props) =>{
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>An unexpected error occured. Sorry!</p>
    </div>
  )
}
export default UnhandledError
