import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../../../../actions/teamActions';
import {Dropdown, DropdownTrigger, DropdownContent, DropdownOption} from '../../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserDropdown extends React.Component {
  render() {
    const {user} = this.props;
    return <Dropdown>
      <DropdownTrigger>
        <FontAwesomeIcon className="dropdown__trigger-icon" icon={['far', 'ellipsis-v']} />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownOption className="dropdown__option" onClick={() => this.props.teamActions.removeFromActiveBusiness(user._id)}>
          Remove
        </DropdownOption>
      </DropdownContent>
    </Dropdown>;
  }
}

UserDropdown.propTypes = {
  teamActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserDropdown);
