import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../actions/authActions';
import * as accountActions from '../../../../actions/accountActions';
import * as teamActions from '../../../../actions/teamActions';
import {selectActiveAccount, selectMemberships} from '../../../../selectors';
import {UserList} from '../../../../components';
import InviteList from './InviteList/InviteList';
import InvitationForm from './InvitationForm';
import UserDropdown from './UserDropdown';

class BusinessProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      intuitConnection: null
    };
    this.urlInputRef = React.createRef();
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.activeBusiness && prevProps.activeBusiness._id !== this.props.activeBusiness._id) {
      this.loadData();
    }
  }
  loadData() {
    this.props.accountActions.getActive();
    this.getActiveAccountUsers();
  }
  static getDerivedStateFromProps(nextProps) {
    var intuitConnection = null;
    if(!nextProps.activeBusiness || !nextProps.activeBusiness.connections) {
      return null;
    }
    nextProps.activeBusiness.connections.forEach(connection => {
      if(connection.providerId === 'intuit') {
        intuitConnection = connection;
      }
    });
    return {
      intuitConnection
    };
  }
  setSelectionRange(ref) {
    if(!ref.current) return;
    ref.current.setSelectionRange(0, ref.current.value.length);
  }
  createRoleIndex(memberships) {
    const index = {};
    memberships.forEach(membership => {
      index[membership.userId] = membership.role;
    });
    return index;
  }
  getActiveAccountUsers = () => {
    const {memberships, usersById} = this.props;
    return memberships
      .map(membership => Object.assign({}, usersById[membership.userId], {role: membership.role}))
      .filter(user => user._id); // Needed because there's leaky function that returns membership without user
  }
  render() {
    const {invitations} = this.props;
    if(!this.props.activeBusiness) {
      return null;
    }
    const inviteSection = invitations.length > 0
      ? <div>
        <h3>Invites</h3>
        <InviteList invitations={this.props.invitations} onRemove={this.cancelInvitation.bind(this)} />
      </div>
      : null;
    return (
      <div>
        <h1>Team</h1>
        <div className="invitation-form__container">
          <InvitationForm onSubmit={this.createInvitation.bind(this)} />
        </div>
        <br />
        <h2>Team</h2>
        <UserList getUsers={this.props.teamActions.getByActiveBusiness} users={this.getActiveAccountUsers()} dropdown={UserDropdown}/>
        <br />
        {inviteSection}
      </div>
    );
  }
}

BusinessProfilePage.propTypes = {
  authActions: PropTypes.object.isRequired,
  activeBusiness: PropTypes.object,
  accountActions: PropTypes.object.isRequired,
  teamActions: PropTypes.object.isRequired,
  memberships: PropTypes.array.isRequired,
  usersById: PropTypes.object.isRequired,
  invitations: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    activeBusiness: selectActiveAccount(state),
    memberships: selectMemberships(state),
    usersById: state.users.byId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessProfilePage);
