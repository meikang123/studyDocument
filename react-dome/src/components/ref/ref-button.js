import React from "react";
import logProps from "./log-props";

class RefButton extends React.Component {
    focus() {
        console.log('---------------focus')
    }

    render() {
        const { handleClick, inputRef } = this.props;
        return (
          <div>
            <button onClick={handleClick}>RefButton</button>
            <input type={'text'} ref={inputRef} />
          </div>

        )
    }
}

export default logProps(RefButton);
