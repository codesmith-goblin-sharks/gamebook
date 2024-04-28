import React from 'react'; 
import Card from './Card.jsx'
//import '../styles.css'; 
import '../stylesheets/CardList.scss'

const CardList = ({ games }) => {
    return (
        <div className='card-list'>
            {games.map((game) => (
                <Card key={game.id} game={game} />
            ))}
        </div>
    );
};

export default CardList;