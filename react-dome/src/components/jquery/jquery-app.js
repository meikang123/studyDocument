import React from 'react';
import Chosen from "./chosen"

class JqueryApp extends React.Component {
  render() {
    return (
      <div>
        <Chosen onChange={value => console.log(value)}>
          <option>vanilla</option>
          <option>chocolate</option>
          <option>strawberry</option>
        </Chosen>
        <select>
          <option>vanilla</option>
          <option>chocolate</option>
          <option>strawberry</option>
        </select>
      </div>
    )
  }
}

export default JqueryApp;
