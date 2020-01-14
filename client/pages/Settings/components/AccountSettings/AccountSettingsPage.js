import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../actions/authActions';
import * as accountActions from '../../../../actions/accountActions';
import {selectActiveAccount} from '../../../../selectors';
import {open as openOverlay} from '../../../../actions/overlayActions';
import {FORM_MODAL} from '../../../../constants/overlayTypes';
import {TEXT} from '../../../../constants/fieldTypes';

class BusinessProfilePage extends React.Component {
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.activeAccount && prevProps.activeAccount._id !== this.props.activeAccount._id) {
      this.loadData();
    }
  }
  loadData() {
    this.props.accountActions.getActive();
  }
  openAccountEditOverlay = () => {
    this.props.openOverlay(FORM_MODAL, {
      onSubmit: patch => this.props.accountActions.update(this.props.activeAccount._id, patch),
      data: this.props.activeAccount,
      fields: [{
        type: TEXT,
        label: 'Name',
        key: 'name'
      },
      {
        type: TEXT,
        label: 'Email',
        key: 'email'
      },
      {
        type: TEXT,
        label: 'Phone',
        key: 'phone'
      }]
    });
  }
  render() {
    const {activeAccount} = this.props;
    if(!activeAccount) return null;
    return (
      <div>
        <div className="card">
          <div className="card__heading">
            <span className="card__title">Account Settings</span>
            <div className="card__heading__right">
              <button className="btn btn-sm btn-default" onClick={this.openAccountEditOverlay}>Edit</button>
            </div>
          </div>
          <div className="card__body card__body--padded">
            <strong>Account Name:</strong> {activeAccount.name}<br/>
            <strong>Contact Email:</strong> {activeAccount.email}<br />
            <strong>Contact Phone:</strong> {activeAccount.phone}<br />
          </div>
        </div>
      </div>
    );
  }
}

BusinessProfilePage.propTypes = {
  activeAccount: PropTypes.object,
  accountActions: PropTypes.object.isRequired,
  openOverlay: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    activeAccount: selectActiveAccount(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch),
    openOverlay: bindActionCreators(openOverlay, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessProfilePage);
