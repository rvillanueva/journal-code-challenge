import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {states} from '../../utils/geo';
import {defaultStyle} from '../../styles/react-select';
import './address-input.scss';

// Since this component is simple and static, there's no parent container for it.
class AddressInput extends React.Component {
  componentDidMount() {
    if(!this.props.value) {
      this.props.onChange({
        streetLine1: '',
        streetLine2: '',
        city: '',
        stateCode: '',
        postalCode: ''
      });
    }
  }
  onChange = (field, value) => {
    if(!this.props.onChange) return;
    this.props.onChange(Object.assign({}, this.props.value, {
      [field]: value
    }));
  }
  getSelectedStateOption = stateCode => {
    if(!stateCode) return null;
    return states.filter(stateOption => stateOption.value === stateCode)[0] || null;
  }
  render() {
    const address = this.props.value || {};
    const streetLine1 = address.streetLine1 || '';
    const streetLine2 = address.streetLine2 || '';
    const city = address.city || '';
    const stateCode = address.stateCode || null;
    const postalCode = address.postalCode || '';
    return (
      <div className="address-input">
        <div className="form-group">
          <div className="form-field">
            <input value={streetLine1} placeholder="Address Line 1" onChange={e => this.onChange('streetLine1', e.target.value)}/>
          </div>
          <div className="form-field">
            <input value={streetLine2} placeholder="Address Line 2" onChange={e => this.onChange('streetLine2', e.target.value)}/>
          </div>
        </div>
        <div className="form-field">
          <div className="form-group row row-less-pad">
            <div className="col-md-6 col-less-pad">
              <input value={city} placeholder="City" onChange={e => this.onChange('city', e.target.value)}/>
            </div>
            <div className="col-md-6 col-less-pad">
              <Select options={states} placeholder="State" value={this.getSelectedStateOption(stateCode)} styles={defaultStyle} onChange={option => this.onChange('stateCode', option.value)}/>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <input value={postalCode} placeholder="Postal Code" onChange={e => this.onChange('postalCode', e.target.value)}/>
          </div>
        </div>
      </div>
    );
  }
}

AddressInput.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};

export default AddressInput;
