import React from 'react';

const Card = ({ game, onLike }) => {
    return (
        <div className="cardContext">
            <img src={game.image} alt={game.title} className="cardImage"/>
            <div className="cardTitle">{game.title}</div>
            <div className="cardSubTitle">{game.platform} | {game.genre} </div>
            <div className="cardSummary">{game.summary} </div>
            <div className="likeBox">
                <button className="cardLike" onClick={() => onLike(game)}>
                    Like
                </button>
            </div>
        </div>
    );
};


export default Card;