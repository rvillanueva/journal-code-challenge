/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import EmailVerificationPage from './EmailVerification/EmailVerificationPage';
import AdminPage from './Admin/AdminPage';
import NotFoundPage from './NotFoundPage';
import SettingsPage from './Settings/SettingsPage';
import HomePage from './Home/HomePage';
import EntryPage from './Entry/EntryPage';
import ComposePage from './Compose/ComposePage';
import PasswordResetRequestPage from './PasswordResetRequest/PasswordResetRequestPage';
import PasswordResetSuccessPage from './PasswordResetSuccess/PasswordResetSuccessPage';
import PasswordResetPage from './PasswordReset/PasswordResetPage';
import {NavbarSide, OverlayManager, Navbar, PrivateRoute, PrivateRouteContainer, ErrorBoundary} from '../components';
import {CSSTransition} from 'react-transition-group';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const {isAuthenticated} = this.props;
    return this.props.isLoaded
      ? <ErrorBoundary>
        <OverlayManager />
        <Switch>
          <PrivateRoute path="/login" component={LoginPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute path="/signup" exact component={SignupPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute path="/signup/verify" exact component={EmailVerificationPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute exact path="/password/request" component={PasswordResetRequestPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <Route exact path="/password/reset" component={PasswordResetPage} />
          <Route exact path="/password/reset/success" component={PasswordResetSuccessPage} />
          <PrivateRouteContainer isAuthorized={isAuthenticated} redirectTo="/login" withParams>
            <div className="fill">
              <div className="fill flex-column">
                <Navbar path={this.props.history} />
                <div className="fill flex-row">
                  <CSSTransition in={this.props.drawerIsOpen} out={!this.props.drawerIsOpen} timeout={500} className="drawer-slider">
                    <NavbarSide key='_'/>
                  </CSSTransition>
                  <div className="content-container flex-column">
                    <Switch>
                      <Route path="/admin" component={AdminPage} />
                      <Route path="/settings" component={SettingsPage} />
                      <Route path="/entries/:entryId" exact component={EntryPage}/>
                      <Route path="/create" exact component={ComposePage}/>
                      <Route path="/" exact component={HomePage}/>
                      <Route component={NotFoundPage} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </PrivateRouteContainer>
        </Switch>
      </ErrorBoundary> : null;
  }
}

App.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  isLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element,
  history: PropTypes.string,
  isAuthenticating: PropTypes.bool.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired
};

export default App;
