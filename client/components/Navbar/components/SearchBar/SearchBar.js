import React from 'react';
//import PropTypes from 'prop-types';
import './search-bar.scss';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }
  onInputChange = inputValue => {
    this.setState({
      inputValue
    });
  }
  render() {
    return <div className="search-bar-container">
      <input
        className="search-bar"
        placeholder="Search"
        value={this.state.inputValue}
        onChange={e => this.onInputChange(e.target.value)} />
    </div>;
  }
}

SearchBar.propTypes = {
};

export default SearchBar;
