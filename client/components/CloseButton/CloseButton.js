import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './close-button.scss';

const CloseButton = ({onClick}) =>
  <button type="button" className="close-button" onClick={onClick}>
    <FontAwesomeIcon icon="times" />
  </button>;

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
