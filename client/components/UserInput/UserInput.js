import React from 'react';
import PropTypes from 'prop-types';
import './recipient-line.scss';
import {RecipientTag} from '..';
import {parse as parseRecipient} from '../../utils/recipient';

export default class RecipientLine extends React.Component {
  constructor() {
    super();
    this.state = {
      textInput: ''
    };
  }
  onInputChange(value) {
    if(value === ' ') {
      this.props.addRecipient(this.state.textInput);
      this.resetRecipientInput();
    } else {
      this.setState({
        textInput: value
      });
    }
  }
  addRecipient(recipientStr) {
    this.props.addRecipient(parseRecipient(recipientStr));
  }
  handleDefaultSubmit = e => {
    e.stopPropagation();
    e.preventDefault();
    this.addRecipient(this.state.textInput);
    this.resetRecipientInput();
  }
  resetRecipientInput() {
    this.setState({
      textInput: ''
    });
  }
  renderRecipientTags() {
    if(!this.props.recipients) return null;
    return this.props.recipients.map((recipient, r) => <RecipientTag key={r} recipient={recipient} remove={() => console.log('remove')} />);
  }
  renderRightButtons() {
    if(!this.props.rightButtons) return null;
    return <div className="recipient-line__right-button-section">
      {this.props.rightButtons.map((button, b) => <div key={b} className="recipient-line__right-button" onClick={button.onClick}>
        {button.label}
      </div>)}
    </div>;
  }
  renderInput() {
    if(this.props.limit && this.props.recipients.length < this.props.limit) {
      return <input
        value={this.state.textInput}
        placeholder={this.props.placeholder || ''}
        onChange={e => this.onInputChange(e.target.value)}
        className="recipient-line__input" />;
    }
    return null;
  }
  render() {
    return <form className="recipient-line" onSubmit={this.handleDefaultSubmit}>
      <div className="recipient-line__label">{this.props.label}</div>
      <div className="recipient-line__recipients">
        {this.renderRecipientTags()}
      </div>
      <div className="recipient-line__input-container">
        {this.renderInput()}
      </div>
      {this.renderRightButtons()}
    </form>;
  }
}

RecipientLine.propTypes = {
  label: PropTypes.string.isRequired,
  limit: PropTypes.number,
  placeholder: PropTypes.string,
  recipients: PropTypes.array,
  addRecipient: PropTypes.func.isRequired,
  rightButtons: PropTypes.array
};
