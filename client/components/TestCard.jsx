import React from 'react';
import CardList from './CardList.jsx'; 
import '../styles.css'; 


const TestCard = () => {
  const mockGames = [
    { id: 1, title: 'Game 1', platform: 'PC', genre: 'Shooter', summary: 'Valorant is bad.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Game 2', platform: 'PS5', genre: 'Adventure', summary: 'Zelda is cool.', image: 'https://via.placeholder.com/150' },
  ];

  return <CardList games={mockGames}/>
};


export default TestCard;
