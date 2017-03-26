import React, { Component } from 'react';
import './Advertisement.css';

class Advertisement extends Component {
  render() {
    return (
        <section className="App-advertisement">
          <img src="http://localhost:8000/ad/?r=304" alt="Add-304"/>
        </section>
    );
  }
}

export default Advertisement;
