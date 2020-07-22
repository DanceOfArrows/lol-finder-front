import React from 'react';

import 'react-awesome-slider/dist/styles.css';
import './styles/Home.css';


class Home extends React.Component {
    render() {
        return (
            <div className='body-content'>
                <div className='splash-container'>
                    <div className='splash-about-general splash-section'>
                        <div className='splash-about-general-title splash-title'>
                            Overview
                        </div>
                        <div className='splash-about-general-text'>
                            LoL Finder is an app that displays a general overview of a player's stats in
                            a MOBA (multiplayer online battle arena) game called League of Legends.  In
                            this game, players face off in two teams of fives playing characters dubbed as
                            champions.
                        </div>
                    </div>
                    <div className='splash-about-search splash-section'>
                        <div className='splash-about-search-title splash-title'>
                            Search
                        </div>
                        <div className='splash-about-search-text'>
                            Using the region selected in the dropdown menu, searches for a
                            player with the given name and displays their stats and past ten games.
                        </div>
                    </div>
                    <div className='splash-about-rotation splash-section'>
                        <div className='splash-about-rotation-title splash-title'>
                            Champion Rotation (Rotation)
                        </div>
                        <div className='splash-about-rotation-text'>
                            Displays the portrait of the champions (playable characters) that are
                            available to play as without being owned by the player. These free
                            characters are usually switched out every week hence the name
                            'champion rotation'.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
