import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './entry-list.scss';
import {Link} from 'react-router-dom';

class EntryList extends React.Component {
  renderEntry(entry) {
    return <Link key={entry._id} className="entry-list__item" to={`/entries/${entry._id}`}>
      <div className="entry-list__item__date">
        <div className="entry-list__item__date__month">
          {moment(entry.date).format('MMM')}
        </div>
        <div className="entry-list__item__date__day">
          {moment(entry.date).format('D')}
        </div>
      </div>
      <div className="entry-list__item__text">
        <p className="entry-list__item__text__title">{entry.title}</p>
        <p className="entry-list__item__text__teaser">{entry.body.substring(0, 120)}</p>
      </div>
    </Link>;
  }
  render() {
    return (
      <div className="entry-list">
        {this.props.entries.map(entry => this.renderEntry(entry))}
      </div>
    );
  }
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired
};

export default EntryList;
