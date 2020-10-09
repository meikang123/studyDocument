import React from "react";
import { ThemesContext } from './context'

class ThemedButton extends React.Component {
    render() {
        const props = this.props;
        const theme = this.context;

        return (
          <button {...props} style={ {background: theme.background} }>Theme button</button>
        );
    }
}

ThemedButton.contextType = ThemesContext;

export default ThemedButton;
