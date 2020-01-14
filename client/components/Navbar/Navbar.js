import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';
import {setDrawerVisibility} from '../../actions/uiActions';
import {bindActionCreators} from 'redux';
import './navbar.scss';
import logo from '../../assets/nav-logo.png';
import SettingsMenu from './components/SettingsMenu';
import SearchBar from './components/SearchBar/SearchBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Since this component is simple and static, there's no parent container for it.
class Navbar extends React.Component {
  render() {
    var login;
    var isLoggedIn = !!this.props.auth.user;
    return (
      <div className="navbar">
        <div className="navbar-group-left">
          <button className="navbar__drawer-toggle" onClick={() => this.props.setDrawerVisibility(!this.props.drawerIsOpen)}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <Link className="navbar__logo__container dropdown__option" to="/">
            <div className="navbar__logo__text">My Journal</div>
          </Link>
        </div>
        <div className="navbar-group-center">
        </div>
        <div className="navbar-group-right">
          <div className="pseudo-full-height" />
          {isLoggedIn ? <SettingsMenu /> : login}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    auth: state.auth,
    drawerIsOpen: state.ui.drawerIsOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    setDrawerVisibility: bindActionCreators(setDrawerVisibility, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
