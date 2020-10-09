import React from "react";
import RefButton from "./ref-button";

// const ref = React.createRef();

class RefApp extends React.Component {

  handleClick = () => {
    console.log(this.ref);
    this.ref.focus();
  }

  refCb = (el) => {
    console.log(el, this)
  }


  render() {

    return (
      <RefButton label="Click Me" inputRef={this.refCb} handleClick={this.handleClick}/>
    )
  }
}

export default RefApp
