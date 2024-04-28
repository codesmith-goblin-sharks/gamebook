import React from 'react';
import '../styles.css'; 

const Card = ({ game, onLike }) => {
  return (
    <div className="cardContext">
      <div className="stackedCard">
        <img
          src={game.image}
          alt={game.title}
          className="cardImage"
        />
        <div className="textContent">
          <div className="cardTitle">{game.title}</div>
          <div className="cardSubTitle">{game.platform} | {game.genre}</div>
          <div className="cardSummary">{game.summary}</div>
        </div>
        <div className="likeBox">
          <button className="cardLike" onClick={onLike}>
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
