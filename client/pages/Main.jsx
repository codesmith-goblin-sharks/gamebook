import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

import CardList from '../components/CardList.jsx';
import PlatformFilter from '../components/PlatformFilter.jsx';
import GenreFilter from '../components/GenreFilter.jsx';

import '../stylesheets/Main.scss';

const Main = ({ user, initialData }) => {
  //-----------------------game cards--------------------------------
  const mockGames = [
    {
      id: 1,
      title: 'Game 1',
      platform: 'PC',
      genre: 'Shooter',
      summary: 'Valorant is bad.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Game 2',
      platform: 'PS5',
      genre: 'Adventure',
      summary: 'Zelda is cool.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Game 3',
      platform: 'PS4',
      genre: 'Horror',
      summary: 'Shaan the clown.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Game 4',
      platform: 'XBOX',
      genre: 'Comedy',
      summary: 'Cyan is funny.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
  ];

  // Current page index, items per page, and page count
  //[Remember to replace mockGames to fetched data]
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(mockGames.length / itemsPerPage);

  // Updates games whenever games state or currentPage state change
  useEffect(() => {
    setCurrentGames(
      games.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );
  }, [games, currentPage]);

  // Handlers for next and previous buttons
  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  //-----------------------filters--------------------------------
  const platforms = [
    'PC (Microsoft Windows)',
    'Web browser',
    'Xbox 360',
    'Xbox One',
    'Xbox Series X|S',
    'PlayStation 5',
    'PlayStation 4',
    'Nintendo Switch',
  ];

  const genre = [
    'Shooter',
    'Indie',
    'MOBA',
    'Adventure',
    'RPG',
    'Strategy',
    'Fighting',
    'Puzzle',
    'Sport',
  ];

  const [activePFilter, setActivePFilter] = useState(platforms); // Platform filters
  const [activeGFilter, setActiveGFilter] = useState(genre); // Genre filters

  //The filters start with all enabled and switch to a mode where only selected filters are active once a user starts interacting with them

  const handlePFilterSelect = selectedPlatform => {
    // Logic for set filter to be added
  };

  const handleGFilterSelect = selectedGenre => {
    // Logic for set filter to be added
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/whatever branch LOL`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              platforms: activePFilter,
              genres: activeGFilter,
            }),
          }
        );

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
    <div className="main">
      <Header />
      <CardList games={mockGames} />
      <div className="filters">
        <div className="platform-filter">
          <PlatformFilter
            platforms={platforms}
            activePFilter={activePFilter}
            onFilterSelect={handlePFilterSelect}
          />
        </div>
        <div className="genre-filter">
          <GenreFilter genre={genre} onFilterSelect={handleGFilterSelect} />
        </div>
      </div>
    </div>
  );
};

export default Main;
