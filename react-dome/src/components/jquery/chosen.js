import React from 'react';
import $ from 'jquery';

class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    console.log(this.$el)
  }

  render() {
    return (
      /*<div>
        <select ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>*/
      <select ref={el => this.el = el} onChange={this.props.onChange}>
        {this.props.children}
      </select>
    )
  }
}

export default Chosen;
