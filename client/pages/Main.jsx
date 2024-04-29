import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

import CardList from '../components/CardList.jsx';
import PlatformFilter from '../components/PlatformFilter.jsx';
import GenreFilter from '../components/GenreFilter.jsx';

import '../stylesheets/Main.scss';

const Main = ({ initialGames }) => {
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
    {
      id: 5,
      title: 'Game 5',
      platform: 'XBOX',
      genre: 'Comedy',
      summary: 'Jay Cho is cool.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
    {
      id: 6,
      title: 'Game 6',
      platform: 'XBOX',
      genre: 'Comedy',
      summary: 'Jay Lee is awesome.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
  ];

  const itemsPerPage = 4;
  // Game states
  const [games, setGames] = useState(initialGames); // Will be updated with the data from backend
  const [currentGames, setCurrentGames] = useState(
    // Game to display on one page
    games.slice(0, itemsPerPage) // Start with the first page
  );

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
    'Sport',
    'Puzzle',
    'Fighting',
  ];

  const [activePFilter, setActivePFilter] = useState(platforms); // Platform filters
  const [activeGFilter, setActiveGFilter] = useState(genre); // Genre filters

  //The filters start with all enabled and switch to a mode where only selected filters are active once a user starts interacting with them

  const handlePFilterSelect = selectedPlatform => {
    setActivePFilter(prevFilters => {
      // Check if we are starting from a state where all filters are active
      const allFiltersActive = prevFilters.length === platforms.length;

      if (allFiltersActive) {
        // If all filters are active and one is clicked, switch to only that filter
        return [selectedPlatform];
      } else {
        // Check if the clicked filter is currently active
        if (prevFilters.includes(selectedPlatform)) {
          // If it is active, remove it
          const filteredFilters = prevFilters.filter(
            pf => pf !== selectedPlatform
          );
          // If removing this filter make it an empty list, reactivate all filters
          return filteredFilters.length > 0 ? filteredFilters : platforms;
        } else {
          // If it is not active, add it
          return [...prevFilters, selectedPlatform];
        }
      }
    });
  };

  const handleGFilterSelect = selectedGenre => {
    setActiveGFilter(prevFilters => {
      // Check if we are starting from a state where all filters are active
      const allFiltersActive = prevFilters.length === genre.length;

      if (allFiltersActive) {
        // If all filters are active and one is clicked, switch to only that filter
        return [selectedGenre];
      } else {
        // Check if the clicked filter is currently active
        if (prevFilters.includes(selectedGenre)) {
          // If it is active, remove it
          const filteredFilters = prevFilters.filter(
            pf => pf !== selectedGenre
          );
          // If removing this filter make it an empty list, reactivate all filters
          return filteredFilters.length > 0 ? filteredFilters : genre;
        } else {
          // If it is not active, add it
          return [...prevFilters, selectedGenre];
        }
      }
    });
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games`, {
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
        setGames(gamesData);
        setCurrentPage(0); //Page rest
      } catch (error) {
        console.error('Error fetching the games:', error);
      }
    };

    fetchGames();
  }, [activePFilter, activeGFilter]); // Fetch games when filters change

  const handleLikedGames = async (likedGame) => {
    try {
      const response = await fetch('/likegame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, gameName })
      });
      const data = await response.json();
      console.log(data); //delete after test

      const updatedGames = currentGames.filter(game => game.id !== likedGame.id); //filter current games to remove liked game
      const newGameResponse = await fetch('/games'); //fetch from game db?
      const newGame = await newGameResponse.json();
      updatedGames.push(newGame)
      setCurrentGames(updatedGames);
    } catch(error) {
      console.error('Error like game', error)
    }
  }
  return (
    <div className="main">
      <Header />
      <CardList
        games={currentGames}
        onLike={handleLikedGames}
        onPreviousClick={goToPreviousPage}
        onNextClick={goToNextPage}
        isPreviousDisabled={currentPage === 0}
        isNextDisabled={currentPage === pageCount - 1}
      />
      <div className="filters">
        <div className="platform-filter">
          <PlatformFilter
            platforms={platforms}
            activePFilter={activePFilter}
            onFilterSelect={handlePFilterSelect}
          />
        </div>
        <div className="genre-filter">
          <GenreFilter
            genre={genre}
            activeGFilter={activeGFilter}
            onFilterSelect={handleGFilterSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
