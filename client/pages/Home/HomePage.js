import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './home-page.scss';
import {selectAllEntries} from '../../selectors';
import {bindActionCreators} from 'redux';
import {getAll as getAllEntries} from '../../actions/entryActions';
import {EntryList} from '../../components/';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  async componentDidMount() {
    try {
      await this.props.getAllEntries();
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
        <div className="content-container">
          <Link className="create-entry-link" to="/create">
            Create new entry
          </Link>
          <EntryList entries={this.props.entries} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  entries: PropTypes.array.isRequired,
  getAllEntries: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    entries: selectAllEntries(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllEntries: bindActionCreators(getAllEntries, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
