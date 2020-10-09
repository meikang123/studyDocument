import React, { Profiler } from "react"
import Component from "./component"

class ShouldComponentUpdateApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#"+ Math.random().toString(16).slice(-6),
      count: 1
    };
  }

  callback(...rage) {
    console.log(rage);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({color: "#"+ Math.random().toString(16).slice(-6)})}>Change Color</button>
        <button onClick={() => this.setState({count: this.state.count + 1})}>Change Count</button>
        <Profiler id={'Component'} onRender={this.callback}>
          <Component color={this.state.color} count={this.state.count} />
        </Profiler>
      </div>
    )
  }
}

export default ShouldComponentUpdateApp;
