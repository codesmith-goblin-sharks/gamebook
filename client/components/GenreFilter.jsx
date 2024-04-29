import React, { useState } from 'react';
import '../stylesheets/GenreFilter.scss'

const GenreFilter = ({ genre, onFilterSelect }) => {
  return (
    <div className='filter-container'>
      {genre.map((element) => (
        <button
          key={element}
          onClick={() => onFilterSelect(element)}
          className='genre-filter-button'
        >
          {element}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
