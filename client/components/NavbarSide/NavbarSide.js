import React from 'react';
import { Link } from 'react-router-dom';
import './navbar-side.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Since this component is simple and static, there's no parent container for it.
export default class NavbarSide extends React.Component {
  render() {
    return (
      <div className="navbar-side__animation-wrapper">
        <div className="navbar-side">
          <div className="navbar-group-center navbar-side__link__container">
            <Link to="/" className="unstyled-link navbar-side__link">
              <span className="navbar-side__link__icon">
                <FontAwesomeIcon icon="home"/>
              </span>Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
