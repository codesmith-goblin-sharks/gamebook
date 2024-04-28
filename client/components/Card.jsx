import React from 'react';
import '../stylesheets/Card.scss';
//import '../styles.css';

const Card = ({ game, onLike }) => {
  return (
    <div className='card'>
      <div className='card-image'>
        <img src={game.image} alt={game.title} className='game-cover' />
      </div>
      <div className='card-content'>
        <h2 className='card-title'>{game.title}</h2>
        <p className='card-subhead'>{game.platform} | {game.genre}</p>
        <p className='card-summary'>{game.summary}</p>
        <button className='card-button' onClick={onLike}>Like</button>
      </div>
    </div>


    // <div className="cardContext">
    //   <div className="stackedCard">
    //     <img
    //       src={game.image}
    //       alt={game.title}
    //       className="cardImage"
    //     />
    //     <div className="textContent">
    //       <div className="cardTitle">{game.title}</div>
    //       <div className="cardSubTitle">{game.platform} | {game.genre}</div>
    //       <div className="cardSummary">{game.summary}</div>
    //     </div>
    //     <div className="likeBox">
    //       <button className="cardLike" onClick={onLike}>
    //         Like
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
