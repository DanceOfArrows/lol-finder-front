import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

// import BPanth from '../assets/DataDragon/img/champion/splash/Pantheon_8.jpg';
// import DSMorde from '../assets/DataDragon/img/champion/splash/Mordekaiser_6.jpg';
// import Kindred from '../assets/DataDragon/img/champion/splash/Kindred_0.jpg';
// import SSNami from '../assets/DataDragon/img/champion/splash/Nami_15.jpg';

const AutoplaySlider = withAutoplay(AwesomeSlider);


// Dynimcally import and use images (works, but I want to use specified 5)
// function importImages(r) {
//     let images = {};
//     r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const champSplash = importImages(require.context('../assets/DataDragon/img/champion/splash', false, /\.jpg/));


class BGSlider extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    // Choose a random number and use the splash from that number (works, but I want to use specified 5)
    // generateImageDiv() {
    //     const generateRandomNum = () => {
    //         const min = 0;
    //         const max = 1205;
    //         return Math.floor(Math.random() * (max - min)) + min;
    //     }

    //     return <div data-src={champSplash[Object.keys(champSplash)[generateRandomNum()]]} />
    // }

    shuffle() { //Fisher-Yates (aka Knuth) shuffle > https://github.com/Daplie/knuth-shuffle
        let array = [
            <div data-src={'https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/splash/Pantheon.jpg'} />,
            <div data-src={'https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/splash/Mordekaiser.jpg'} />,
            <div data-src={'https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/splash/Kindred.jpg'} />,
            <div data-src={'https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/splash/Nami.jpg'} />,
        ];
        let currentIndex = array.length, temporaryValue, randomIndex;


        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {
        const imageDivs = this.shuffle();
        return (
            <div className='awesome-slider'>
                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={5000}
                    mobileTouch={false}
                    bullets={false}
                    fillParent={true}
                    organicArrows={false}
                    buttons={false}
                >

                    {imageDivs[0]}
                    {imageDivs[1]}
                    {imageDivs[2]}
                    {imageDivs[3]}

                </AutoplaySlider>
            </div >
        )
    }
}

export default BGSlider;