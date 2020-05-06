import React from 'react';
import { useHistory } from "react-router-dom";
// This component gets mounted if the user somehow requests a non-existing site
const Error = (props) =>{
  let history = useHistory();
  return (
    <div className="error">
      <h1>Ah, the good ol' 404-Error</h1>
      <p>Unfortunately, the site <strong>{history.location.pathname}</strong> you requested is not available!</p>
      <button type="button" onClick={() => history.goBack()}>Back</button>
    </div>
  )
}
export default Error
