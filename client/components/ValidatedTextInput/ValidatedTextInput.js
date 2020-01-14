import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './validated-text-input.scss';

export default class ValidatedTextInput extends React.Component {
  isValid = () => {
    let isValid = true;
    const {validate, value} = this.props;
    if(validate.isEmail) {
      if(!validator.isEmail(value)) {
        isValid = false;
      }
    }
    return isValid;
  }
  renderValidationIcon = () => {
    const isValid = this.isValid();
    const {isDirty} = this.props;
    if(isDirty && isValid) return <FontAwesomeIcon icon={['far', 'check']} className="validated-text-input__icon validated-text-input__icon--valid" />;
    if(isDirty && !isValid) return <FontAwesomeIcon icon={['far', 'times']} className="validated-text-input__icon validated-text-input__icon--invalid" />;
    return null;
  }
  render() {
    const {className, value, isDirty, placeholder, onBlur, onFocus, onChange} = this.props;
    const isInvalid = !this.isValid() && isDirty;
    return <span className="validated-text-input">
      {this.renderValidationIcon()}
      <input
        className={`${className || ''} ${isInvalid ? 'validated-text-input__input--invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
        onBlur={onBlur}
        onFocus={onFocus}/>
    </span>;
  }
}

ValidatedTextInput.propTypes = {
  validate: PropTypes.object.isRequired,
  value: PropTypes.string,
  isDirty: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
