import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

import CardList from '../components/CardList.jsx';
import PlatformFilter from '../components/PlatformFilter.jsx';
import GenreFilter from '../components/GenreFilter.jsx';

import '../stylesheets/Main.scss';

const Main = ({ initialGames, user }) => {
  //-----------------------game cards--------------------------------
  const mockGames = [
    {
      id: 1,
      title: 'Game 1',
      platforms: ['PC'],
      genres: ['Shooter'],
      summary:
        'Valorant is bad. /n gjwopgqjaposdajgas;kgjdskla;gnrigjwroqig;jiwoqglkanzgfsjklgnagj;lsdfldsnnosngsoagosijgsiofalkslfjoawpgnrhiknjcnvcosapljrilajfreiajlnvjfksn;d',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Game 2',
      platforms: ['PS5'],
      genres: ['Adventure'],
      summary: 'Zelda is cool.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Game 3',
      platforms: ['PS4'],
      genres: ['Horror'],
      summary: 'Shaan the clown.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Game 4',
      platforms: ['XBOX'],
      genres: ['Comedy'],
      summary: 'Cyan is funny.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
    {
      id: 5,
      title: 'Game 5',
      platforms: ['XBOX'],
      genres: ['Comedy'],
      summary: 'Jay Cho is cool.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
    {
      id: 6,
      title: 'Game 6',
      platforms: ['XBOX'],
      genres: ['Comedy'],
      summary: 'Jay Lee is awesome.',
      image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
    },
  ];

  const itemsPerPage = 4;
  // Game states
  const [games, setGames] = useState(initialGames); // Will be updated with the data from backend
  const [currentGames, setCurrentGames] = useState(
    // Game to display on one page
    // games.slice(0, itemsPerPage) // Start with the first page
    []
  );
  console.log('games', games);
  // Current page index, items per page, and page count
  //[Remember to replace mockGames to fetched data]
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(games.length / itemsPerPage);

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

  //testing filter
  // useEffect(() => {
  //   console.log(activePFilter);
  // }, [activePFilter]);

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
            username: user,
            platforms: activePFilter,
            genres: activeGFilter,
          }),
        });

        if (!response.ok) {
          console.log('Backend data fetching issue with filter');
        }

        const gamesData = await response.json();
        // Update with the new games data
        console.log('gamesData', gamesData);
        console.log(Array.isArray(gamesData));
        setGames(gamesData);
        setCurrentPage(0); //Page rest
      } catch (error) {
        console.error('Error fetching the games:', error);
      }
    };
    if (user !== '') {
      console.log('user ready');
      fetchGames();
    }
  }, [activePFilter, activeGFilter]); // Fetch games when filters change

  const handleLikedGames = async likedGame => {
    try {
      const response = await fetch('http://localhost:3000/likegame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: user, gameName: likedGame }),
      });
      const data = await response.json();
      if (typeof data === 'object') {
        console.log('Unliked', data); //delete after test
        const updatedGames = games.filter(game => game.name !== data.name); //filter current games to remove liked game
        // const newGameResponse = await fetch('/games'); //fetch from game db?
        // const newGame = await newGameResponse.json();
        // updatedGames.push(newGame);
        setCurrentGames(updatedGames);
        setGames(updatedGames);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error like game', error);
    }
  };
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
