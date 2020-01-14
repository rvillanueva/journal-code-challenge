import React from 'react';
import PropTypes from 'prop-types';
import {stopEvent} from '../../../../utils/dom';

class InvitationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isSending: false
    };
  }
  async onSubmit(e) {
    try {
      stopEvent(e);
      if(this.state.isSending) {
        return;
      }
      const {email} = this.state;
      this.setState({
        isSending: true
      });
      await this.props.onSubmit({
        email,
        role: 'user'
      });
      this.setState({
        email: '',
        isSending: false
      });
      return;
    } catch(err) {
      console.error(e);
      this.setState({
        isSending: false
      });
    }
  }
  onChange(e) {
    if(e && e.target.name === 'invited-email') {
      this.setState({
        email: e.target.value
      });
    }
  }
  render() {
    return (
      <form className="invitation-form" onSubmit={this.onSubmit.bind(this)}>
        <input name="invited-email"
          placeholder="Invite users by email"
          className="invitation-form__input"
          value={this.state.email}
          onChange={this.onChange.bind(this)}
          disabled={this.state.isSending}
        />
        <button type="submit" className="btn btn-md btn-primary">Invite</button>
      </form>
    );
  }
}

InvitationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default InvitationForm;
