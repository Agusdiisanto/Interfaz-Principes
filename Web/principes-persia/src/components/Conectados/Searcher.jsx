import "./Searcher.css"
import { useState } from 'react';
import PropTypes from 'prop-types';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Searcher = ({setQuery}) => {
 
  const [searchText, setSearchText] = useState('')

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setQuery(searchText)
    }
  }

  return (
    <div>
      <div className="title-container-searcher">
      </div>
      <div className="search-container">
      <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon"/>
        <input 
          type="text" 
          className="search-input"
          placeholder="Buscar Ubicacion" 
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
      </div>
      </div>
    </div>
  );
};

Searcher.propTypes = {
    setQuery: PropTypes.func.isRequired,
};
  

export default Searcher;