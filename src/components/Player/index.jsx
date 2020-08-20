import React from 'react';

import './styles.scss';

import rock from '../../assets/rock.png';
import paper from '../../assets/paper.png';
import scissors from '../../assets/scissors.png';

const Player = ({weapon}) => {
    return (
        <div className="player">
            <img className="player-image" 
            src={
                weapon === "rock" ? rock : weapon === "scissors" ? scissors : paper
            }
            alt="Rock Paper Scissors"/>
        </div>
    )
}

export default Player;