import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

import CardList from '../components/CardList.jsx';
import PlatformFilter from '../components/PlatformFilter.jsx';
import GenreFilter from '../components/GenreFilter.jsx';

import '../stylesheets/Main.scss';

const Main = () => {
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

  // Current page index, items per page, and page count
  //[Remember to replace mockGames to fetched data]
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const pageCount = Math.ceil(mockGames.length / itemsPerPage);

  // Current games to show
  //[Remember to replace mockGames to fetched data]
  // const currentGames = mockGames.slice(
  //   currentPage * itemsPerPage, //First item for the page
  //   (currentPage + 1) * itemsPerPage //Last item for the page
  // );

  const [currentGames, setCurrentGames] = useState(games.slice(0, itemsPerPage));

  useEffect(() => {
    setCurrentGames(games.slice(
      currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage
    ));
  }, [currentPage, games]);
  //update currentGame when game or currentPage changes

  // Handlers for next and previous buttons
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  //-----------------------filters--------------------------------
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

  const [activePFilter, setActivePFilter] = useState(platforms); // Platform filters
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
    <div className='main'>
      <Header />
      <CardList
        games={currentGames}
        onLike={handleLikedGames}
        onPreviousClick={goToPreviousPage}
        onNextClick={goToNextPage}
        isPreviousDisabled={currentPage === 0}
        isNextDisabled={currentPage === pageCount - 1}
      />
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
