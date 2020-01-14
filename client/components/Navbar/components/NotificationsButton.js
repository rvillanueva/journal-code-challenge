import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../navbar.scss';

const NotificationsButton = ({requests}) =>
  <Link to="/requests" className="navbar__notifications-button">
    <FontAwesomeIcon icon="bell" />
    {requests.length > 0 ? <div className="navbar__notifications-button__counter">{requests.length}</div> : null}
  </Link>;

NotificationsButton.propTypes = {
  requests: PropTypes.array.isRequired
};

export default NotificationsButton;
