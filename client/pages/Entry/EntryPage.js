import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './entry-page.scss';
import {bindActionCreators} from 'redux';
import {getById as getEntryById} from '../../actions/entryActions';
import {Link} from 'react-router-dom';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.entryId = props.match.params.entryId;
    this.state = {
      isLoaded: false
    };
  }
  async componentDidMount() {
    try {
      console.log('getting entry ', this.entryId)
      await this.props.getEntryById(this.entryId);
      this.setState({
        isLoaded: true
      });
    } catch(err) {
      console.error(err);
    }
  }
  render() {
    const entry = this.props.entriesById[this.entryId] || null;
    if(!entry) {
      return <div>
        Could not find entry! Try returning <Link to="/">home</Link>.
      </div>;
    }
    return (
      <div className="entry-page page-body">
        <div className="content-container">
          <p className="entry-page__title">{entry.title}</p>
          <p className="entry-page__body">{entry.body}</p>
        </div>
      </div>
    );
  }
}

EntryPage.propTypes = {
  match: PropTypes.object.isRequired,
  getEntryById: PropTypes.func.isRequired,
  entriesById: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    entriesById: state.entries.byId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getEntryById: bindActionCreators(getEntryById, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPage);
