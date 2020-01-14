import React from 'react';
import PropTypes from 'prop-types';
import './invite-list.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class InviteList extends React.Component {
  onRemove(invitationId) {
    if(this.props.onRemove) {
      this.props.onRemove(invitationId);
    }
  }
  render() {
    const inviteItems = this.props.invitations.map(invitation =>
      <div key={invitation._id} className="card-list__item card-list__item--padded flex-row">
        <div className="flex-row__group flex-row__group--left">
          {invitation.email}
        </div>
        <div className="flex-row__group flex-row__group--left">
          {invitation.role}
        </div>
        <div className="flex-row__group flex-row__group--right">
          <FontAwesomeIcon className="remove-button" icon={['fal', 'times']} onClick={() => this.onRemove(invitation._id)}/>
        </div>
      </div>
    );
    return inviteItems.length ? <div className="card-list">
      {inviteItems}
    </div> : 'No outstanding invitations.';
  }
}

InviteList.propTypes = {
  invitations: PropTypes.array.isRequired,
  onRemove: PropTypes.func
};

export default InviteList;
