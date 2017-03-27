import React, { Component } from 'react';
import './Advertisement.css';

class Advertisement extends Component {
  render() {
    const url = '/ad/?r=' + this.props.ad;
    return (
        <section className="App-advertisement">
          <img src={url} alt="Add-304"/>
        </section>
    );
  }
}

export default Advertisement;
