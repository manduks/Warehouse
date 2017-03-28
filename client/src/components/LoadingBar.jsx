import React from 'react';
import './LoadingBar.css';

const LoadingBar = function LoadingBar(props) {
  return (
    <div className="App-loading-bar" {... props}>
      <span>Loading ...</span>
    </div>
  );
};
export default LoadingBar;
