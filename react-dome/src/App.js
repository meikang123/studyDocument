import React from 'react';
import ButtonApp from "./components/context/button-app";
import RefApp from "./components/ref/ref-app";
import JqueryApp from "./components/jquery/jquery-app"
import ShouldComponentUpdateApp from "./components/shouldComponentUpdate/ShouldComponentUpdate-app"

const Input = (props) => {
  return <input type="text" value={props.value} readOnly={true} />
}

const Child1 = (props) => {
    return <div>Child1{props.name}</div>
}

const Child2 = (props) => {
    return <div>Child2{props.name}</div>
}

const Parent = (props) => {
    const { L, R } = props;
    return (
        <div>Parent< L name="L" /><R name="R" /></div>
    )
}

function App() {
  return (
    <div className="App">
      <Input value={123} />
      <Parent L={Child1} R={Child2} />

      <ButtonApp />

      <RefApp />

      <JqueryApp />

      <ShouldComponentUpdateApp />
    </div>
  );
}

export default App;
