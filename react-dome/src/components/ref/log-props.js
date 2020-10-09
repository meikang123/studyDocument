import React from "react";

export default function logProps(WrapperComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props', prevProps);
            console.log('new props', this.props);
        }

        render() {
            const {forwardedRef, ...rest} = this.props;
            return <WrapperComponent ref={forwardedRef} {...rest} />
        }
    }

    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />
    })
}
