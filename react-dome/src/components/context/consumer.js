import React from "react";
import { ThemesContext } from "./context";

function ContextConsumer() {
    return (
        <ThemesContext.Consumer>
            {theme => (
                <p>
                  <span>{JSON.stringify(theme)}</span>
                  <span>prompt：</span>
                </p>
            )}
        </ThemesContext.Consumer>
    );
}

export default ContextConsumer;
