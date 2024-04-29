import React from 'react';
import '../stylesheets/Card.scss';
//import '../styles.css';

const Card = ({ game, onLike }) => {
  return (
    <div className='card'>
      <div className='card-image'>
        <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', }}/>
      </div>
      <div className='card-content'>
        <h2 className='card-title'>{game.title}</h2>
        <p className='card-subhead'>{game.platform} | {game.genre}</p>
        <p className='card-summary'>{game.summary}</p>
        <button className='card-button' onClick={onLike}>Like</button>
      </div>
    </div>
  );
};

export default Card;
