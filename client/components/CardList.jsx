import React from 'react'; 
import Card from './Card'

const CardList = ({ games }) => {
    return (
        <div>
            {games.map((game) => (
                <Card key={game.id} game={game} />
            ))}
        </div>
    );
};

export default CardList;