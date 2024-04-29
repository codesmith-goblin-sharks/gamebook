import React from 'react';
import '../stylesheets/Card.scss';
//import '../styles.css';

const Card = ({ game, onLike }) => {
  const platforms = game.platforms.join(', ');
  const genres = game.genres.join(', ');
  const cover = 'https://' + game.cover;
  return (
    <div className="card">
      <div className="card-image">
        <img
          src={cover}
          alt={game.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{game.name}</h2>
        <p className="card-subhead">
          {platforms} | {genres}
        </p>
        <p className="card-summary">{game.summary}</p>
        <button className="card-button" onClick={onLike}>
          Like
        </button>
      </div>
    </div>
  );
};

export default Card;
