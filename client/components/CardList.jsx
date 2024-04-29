import React from 'react';
import Card from './Card.jsx';
//import '../styles.css';
import '../stylesheets/CardList.scss';

const CardList = ({
  games,
  onPreviousClick,
  onNextClick,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="card-list-container">
      <div
        className="pageturn-button-previous"
        onClick={onPreviousClick}
        disabled={isPreviousDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="85"
          viewBox="0 0 30 85"
          fill="none"
        >
          <path d="M0 42.5L30 0.497772L30 84.5022L0 42.5Z" fill="#D9D9D9" />
        </svg>
      </div>

      <div className="card-list">
        {games.map(game => (
          <Card key={game.id} game={game} />
        ))}
      </div>

      <div
        className="pageturn-button-next"
        onClick={onNextClick}
        disabled={isNextDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="85"
          viewBox="0 0 30 85"
          fill="none"
        >
          <path d="M30 42.5L0 84.5022L0 0.497768L30 42.5Z" fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};

export default CardList;
