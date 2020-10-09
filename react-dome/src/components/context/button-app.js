import React from "react";
import { themes, ThemesContext } from './context'
import ThemedButton from "./themed-button";
import ContextConsumer from "./consumer";

function ToolBar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
    );
}

class ButtonApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light
        };

        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }))
        }
    }

    render() {
        return (
            <div>
                <ThemesContext.Provider value={this.state.theme}>
                    <ToolBar changeTheme={this.toggleTheme} />
                    <ContextConsumer />
                </ThemesContext.Provider>
                <section>
                    <ThemedButton />
                    <ContextConsumer />
                </section>
            </div>
        );
    }

}

export default ButtonApp;
