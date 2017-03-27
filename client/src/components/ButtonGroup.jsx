import React, { Component } from 'react';
import './ButtonGroup.css';

class ButtonGroup extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
        selected: ''
    }
  }
  handleClick(text) {
    this.props.onClick(text);
    this.setState({
      selected: text
    });
  }
  renderButtons() {
    return this.props.buttons.map(text => (
      <button
        className={this.state.selected === text ? 'App-btn-group-selected': ''}
        key={text}
        onClick={this.handleClick.bind(null, text)}
        >{text}</button>
    ));
  }
  render() {
    return (
      <div className="App-btn-group">
        {this.renderButtons()}
      </div>
    );
  }
}

export default ButtonGroup;
