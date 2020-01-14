
import React from 'react';
import './animated-checkmark.scss';

const AnimatedCheckmark = () =>
  <svg className="animated-checkmark" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
    <circle
      className="animated-checkmark__circle"
      fill="none" stroke="rgb(57, 125, 217)"
      strokeWidth="6"
      strokeMiterlimit="10"
      cx="65.1"
      cy="65.1"
      r="62.1"/>
    <polyline
      className="animated-checkmark__check"
      fill="none"
      stroke="rgb(57, 125, 217)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeMiterlimit="10"
      points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
  </svg>;

export default AnimatedCheckmark;
