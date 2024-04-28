import React, { useState } from 'react';
import '../stylesheets/PlatformFilter.scss'

const PlatformFilter = ({ platforms, onFilterSelect }) => {
  return (
    <div className='filter-container'>
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => onFilterSelect(platform)}
          className='filter-button'
        >
          {platform}
        </button>
      ))}
    </div>
  );
};

export default PlatformFilter;
