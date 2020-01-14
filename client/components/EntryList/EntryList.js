import React from 'react';
import PropTypes from 'prop-types';
import './entry-list.scss';


class EntryList extends React.Component {
  renderEntry(entry) {
    return <div className="entry-list__-item">
      <div className="entry-list__item__date">
        {entry.date}
      </div>
      <div className="entry-list__item__title">
        {entry.title}
      </div>
    </div>;
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
