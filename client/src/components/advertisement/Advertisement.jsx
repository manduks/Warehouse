import React from 'react';
import './Advertisement.css';

const Advertisement = function Advertisement(props) {
  const url = `/ad/?r=${props.ad}`;
  return (
    <section className="App-advertisement">
      <img src={url} alt="Add-304" />
    </section>
  );
};

Advertisement.propTypes = {
  ad: React.PropTypes.number.isRequired,
};

export default Advertisement;
