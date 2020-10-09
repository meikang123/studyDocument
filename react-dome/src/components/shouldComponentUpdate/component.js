import React from "react"

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 1
    }
  }

  shouldComponentUpdate() {
    console.log(20)
    return true
  }

  render() {
    return (
      <div style={{color: this.props.color}}>
        MK：{this.state.age}
      </div>
    )
  }
}

export default Component;
