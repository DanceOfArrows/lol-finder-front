import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './Home.css';

import bg0 from '../assets/DataDragon/img/champion/splash/Kindred_0.jpg';
import bg1 from '../assets/DataDragon/img/champion/splash/Akali_0.jpg';
import bg2 from '../assets/DataDragon/img/champion/splash/Ahri_0.jpg';

const AutoplaySlider = withAutoplay(AwesomeSlider);

class Home extends React.Component {
    render() {
        return (
            <div className='home-awesome-slider'>
                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={5000}
                    mobileTouch={false}
                >
                    <div data-src={bg0} className='bg0' />
                    <div data-src={bg1} className='bg1' />
                    <div data-src={bg2} className='bg1' />
                </AutoplaySlider>
            </div >
        );
    }
}

export default Home;
