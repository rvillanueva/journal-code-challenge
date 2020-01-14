import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './home-page.scss';
import {bindActionCreators} from 'redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  async componentDidMount() {
    try {
      this.setState({
        isLoaded: true
      });
    } catch(err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div className="page-body">
      </div>
    );
  }
}

HomePage.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
