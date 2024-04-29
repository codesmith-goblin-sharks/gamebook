import React from 'react';
import Card from './Card.jsx';
//import '../styles.css';
import '../stylesheets/CardList.scss';

const CardList = ({
  games,
  onLike,
  onPreviousClick,
  onNextClick,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div className='card-list-container'>
      <div
        className='pageturn-button-previous'
        onClick={onPreviousClick}
        disabled={isPreviousDisabled}
      >
        ◀️
      </div>

      <div className='card-list'>
        {games.map((game) => (
          <Card key={game.id} game={game} onLike={() => onLike(game.id)} />
        ))}
      </div>

      <div
        className='pageturn-button-next'
        onClick={onNextClick}
        disabled={isNextDisabled}
      >
        ▶️
      </div>
    </div>
  );
};

export default CardList;
