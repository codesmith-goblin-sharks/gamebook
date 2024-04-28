import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

import PlatformFilter from '../components/PlatformFilter.jsx';
import GenreFilter from '../components/GenreFilter.jsx';

import '../stylesheets/Main.scss';

const Main = () => {
  const platforms = [
    'PC (Microsoft Windows)',
    'Web browser',
    'Xbox 360',
    //starting from here are all dummy variable since we didn't really get relevant data
    'Xbox One',
    'Xbox Series X|S',
    'PlayStation 5',
    'PlayStation 4',
    'Switch',
  ];

  const genre = [
    'Shooter',
    'Indie',
    'MOBA',
    'Adventure',
    //starting from here are all dummy variable since we didn't really get relevant data
    'RPG',
    'Strategy',
  ];

  const [activePFilter, setActivePFilter] = useState(platform); // Platform filters
  const [activeGFilter, setActiveGFilter] = useState(genre); // Genre filters

  const handlePFilterSelect = (selectedPlatform) => {
    // Logic for set filter to be added
  };

  const handleGFilterSelect = (selectedGenre) => {
    // Logic for set filter to be added
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://localhost:3000/whatever branch LOL`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            platforms: activePFilter,
            genres: activeGFilter,
          }),
        });

        if (!response.ok) {
          console.log('Backend data fetching issue with filter');
        }

        const gamesData = await response.json();
        // Update with the new games data
        // setGames(gamesData);
      } catch (error) {
        console.error('Error fetching the games:', error);
      }
    };

    fetchGames();
  }, [activePFilter, activeGFilter]); // Fetch games when filters change

  return (
    <div className='main'>
      <Header />
      {/* {CardList here} */}
      <div className='filters'>
        <div className='platform-filter'>
          <PlatformFilter
            platforms={platforms}
            onFilterSelect={handlePFilterSelect}
          />
        </div>
        <div className='genre-filter'>
          <GenreFilter genre={genre} onFilterSelect={handleGFilterSelect} />
        </div>
      </div>
    </div>
  );
};

export default Main;
