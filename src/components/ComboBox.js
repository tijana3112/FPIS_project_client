import React, { Component } from "react";

class ComboBox extends Component {
  render() {
    const optionValues = this.props.option;
    return (
      <select
        id={this.props.id}
        className="input form-control"
        value={this.props.ID}
        onChange={this.props.onChange}
      >
        <option key="" value="0">
          {this.props.text}
        </option>
        {optionValues}
      </select>
    );
  }
}

export default ComboBox;
