import React from 'react';
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { getChampRotation } from '../redux/freeRotation';
import './styles/FreeRotation.css';

const override = css`
  border-color: #C44017;
`;

class FreeRotation extends React.Component {
    constructor(props) {
        super(props);

        // this.importAll = this.importAll.bind(this);
        this.showStandardRotation = this.showStandardRotation.bind(this);
        this.showNewPlayerRotation = this.showNewPlayerRotation.bind(this);
        this.standardRotationBtn = null;
        this.newPlayerRotationBtn = null;
        this.standardRotation = null;
        this.newPlayerRotation = null;
    }

    componentDidMount() {
        this.props.getChampRotation();
    }

    componentDidUpdate() {
        const standardRotationBtn = document.querySelector('.rotation-standard-button');
        const newPlayerRotationBtn = document.querySelector('.rotation-new-players-button')
        const standardRotation = document.querySelector('.rotation');
        const newPlayerRotation = document.querySelector('.rotation-new-players')

        if (standardRotationBtn && newPlayerRotationBtn && standardRotation && newPlayerRotation) {
            this.standardRotationBtn = standardRotationBtn;
            this.newPlayerRotationBtn = newPlayerRotationBtn;
            this.standardRotation = standardRotation;
            this.newPlayerRotation = newPlayerRotation;
        }
    }

    // importAll(r) {
    //     let images = {};
    //     r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
    //     return images;
    // }

    showStandardRotation() {
        this.standardRotationBtn.classList.add('rotation-active');
        this.newPlayerRotationBtn.classList.remove('rotation-active');
        this.standardRotation.style.display = 'grid';
        this.newPlayerRotation.style.display = 'none';
    }

    showNewPlayerRotation() {
        this.standardRotationBtn.classList.remove('rotation-active');
        this.newPlayerRotationBtn.classList.add('rotation-active');
        this.standardRotation.style.display = 'none';
        this.newPlayerRotation.style.display = 'grid';
    }

    render() {
        // const champIcons = this.importAll(require.context('../assets/DataDragon/img/champion/tiles', false, /_0\.jpg/));
        return (
            <div className='body-content'>
                {this.props.champRotation ? (
                    <div className='rotation-container'>
                        {/* This is messy, but basically check if the fetch for champs finished.
                    If it is not finished, render the loading symbol.  If it is finished, then
                    update the page to load in all the icons. */}
                        <>
                            <div className='rotation-type'>
                                <button className='rotation-standard-button rotation-active'
                                    onClick={this.showStandardRotation}
                                >
                                    Standard Rotation
                                    </button>
                                <button className='rotation-new-players-button'
                                    onClick={this.showNewPlayerRotation}
                                >
                                    New Player Rotation
                                    </button>
                            </div>
                            <div className='rotation'>
                                {this.props.champRotation.freeChampionRotation.map((champion, index, arr) => {
                                    const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${champion}_0.jpg`;

                                    return (
                                        <img
                                            key={champion}
                                            className={'free-champ'}
                                            src={champImgSrc}
                                            alt='ChampIcon'
                                        />
                                    )
                                })}
                            </div>
                            <div className='rotation-new-players'>
                                {this.props.champRotation.freeChampionRotationForNewPlayers.map((champion, index, arr) => {
                                    const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${champion}_0.jpg`;

                                    return (
                                        <img
                                            key={champion}
                                            className={'free-champ'}
                                            src={champImgSrc}
                                            alt='ChampIcon'
                                        />
                                    )
                                })}
                            </div>
                        </>

                    </div>) : (
                        <div className="rotation-loading">
                            <ClipLoader
                                css={override}
                                size={150}
                                color={"#123abc"}
                                loading={this.props.loading}
                            />
                        </div>
                    )
                }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        champRotation: state.freeRotation.champRotation,
        loading: state.app.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getChampRotation: () => dispatch(getChampRotation()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    FreeRotation
);