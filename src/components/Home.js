import React from 'react';
import { NavLink } from 'react-router-dom';

import 'react-awesome-slider/dist/styles.css';
import './styles/Home.css';
import BGSlider from './BGSlider';

class Home extends React.Component {
    render() {
        return (
            <div className='body-content'>
                <div className='home-welcome-container'>
                    <div className='home-welcome-elements'>
                        <NavLink exact to='/search'
                            className='nav-link-search-btn'>
                            <button className='home-welcome-btn'>
                                Get Started
                                </button>
                        </NavLink>
                    </div>
                    {/* <div className='home-welcome-btn-border' /> */}

                </div>
                <BGSlider />
            </div >
        );
    }
}

export default Home;
