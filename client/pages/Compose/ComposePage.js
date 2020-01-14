import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './compose-page.scss';
import {bindActionCreators} from 'redux';
import {stopEvent} from '../../utils/dom';
import {SubmitButton} from '../../components';
import {create as createEntry} from '../../actions/entryActions';
import {push as goTo} from '../../actions/routerActions';
import moment from 'moment';

class ComposePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      date: moment()
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
  onSubmit = async e => {
    stopEvent(e);
    try {
      const {title, body, date} = this.state;
      await this.props.createEntry({
        title,
        body,
        date: date.toDate()
      });
      this.props.goTo('/');
    } catch(err) {
      console.error(err);
    }
  }
  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }
  render() {
    return (
      <div className="compose-page page-body">
        <form onSubmit={this.onSubmit}>
          <div>
            <input className="compose__title-input" placeholder="Title" value={this.state.title} onChange={e => this.onInputChange('title', e.target.value)}/>
          </div>
          <div>
            <textarea className="compose__body-input" placeholder="Put your thoughts here..." value={this.state.body} onChange={e => this.onInputChange('body', e.target.value)}/>
          </div>
          <div className="compose__save-button-container">
            <SubmitButton value="Save" />
          </div>
        </form>
      </div>
    );
  }
}

ComposePage.propTypes = {
  createEntry: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: bindActionCreators(createEntry, dispatch),
    goTo: bindActionCreators(goTo, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposePage);
