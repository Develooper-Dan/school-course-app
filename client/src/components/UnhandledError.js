import React from 'react';

// This component gets mounted if a serverside error occurs
const UnhandledError = (props) =>{
  return (
    <div className="error">
      <h1>Error</h1>
      <p>An unexpected error occured. Sorry!</p>
    </div>
  )
}
export default UnhandledError
