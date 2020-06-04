import React from 'react';
import { connect } from 'react-redux';
import { getSummonerInfo } from '../redux/summonerInfo';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Infinite from 'react-infinite';

import './styles/SummonerInfo.css';
import bronzeEmblem from '../assets/RankedEmblems/Emblem_Bronze.png';
import challengerEmblem from '../assets/RankedEmblems/Emblem_Challenger.png';
import diamondEmblem from '../assets/RankedEmblems/Emblem_Diamond.png';
import goldEmblem from '../assets/RankedEmblems/Emblem_Gold.png';
import grandmasterEmblem from '../assets/RankedEmblems/Emblem_Grandmaster.png';
import ironEmblem from '../assets/RankedEmblems/Emblem_Iron.png';
import masterEmblem from '../assets/RankedEmblems/Emblem_Master.png';
import platinumEmblem from '../assets/RankedEmblems/Emblem_Platinum.png';
import silverEmblem from '../assets/RankedEmblems/Emblem_Silver.png';

const override = css`
  border-color: #C44017;
`;

// function importImages(r) {
//     let images = {};
//     r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const summonerIcons = importImages(require.context('../assets/DataDragon/10.9.1/img/profileicon', false, /\.png/));
// const champIcons = importImages(require.context('../assets/DataDragon/img/champion/tiles', false, /_0\.jpg/));
class SummonerInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
        }

        this.getRankImg = this.getRankImg.bind(this);
    }

    componentDidMount() {
        this.props.getSummonerInfo(window.location.pathname.split("/").pop(), this.props.region);
    }

    getRankImg() {
        if (!this.props.summonerInfo.rank) return;
        const tier = this.props.summonerInfo.rank.tier;

        if (tier === 'IRON') return ironEmblem;
        if (tier === 'BRONZE') return bronzeEmblem;
        if (tier === 'SILVER') return silverEmblem;
        if (tier === 'GOLD') return goldEmblem;
        if (tier === 'PLATINUM') return platinumEmblem;
        if (tier === 'DIAMOND') return diamondEmblem;
        if (tier === 'MASTER') return masterEmblem;
        if (tier === 'GRANDMASTER') return grandmasterEmblem;
        if (tier === 'CHALLENGER') return challengerEmblem;
    }

    loadMatches() {
        let matches = this.props.summonerInfo.matchHistory.map((match, i) => {
            // const champImgName = `${match.champion}_0.jpg`;
            const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${match.champion}_0.jpg`
            return (
                <div className='summoner-info-match' key={`match-${i}`}
                    matchId={match.matchId}
                    map={match.map}
                    season={match.season}
                >
                    <div className='match-champion-icon-area'>
                        <div className='match-champion-icon-cut'>
                            <img src={champImgSrc} alt='ChampIco' />
                        </div>
                        <div className='match-queue-type'>{match.queueDescription}</div>
                    </div>
                </div>
            )
        })
        return matches;
    }

    // Send back win ratio, total games, etc.
    summonerGameCalc() {
        const wins = this.props.summonerInfo.rank.wins;
        const losses = this.props.summonerInfo.rank.losses;

        const totalGames = wins + losses;
        const winRatio = + (Math.floor(((wins / totalGames) * 100) * 100) / 100);

        return [totalGames, winRatio];
    }

    render() {
        return (
            <div className='body-content'>
                {this.props.summonerInfo && !this.props.loading ? (
                    <div className='summoner-info-container'>
                        <div className='summoner-info-main'>
                            <div className='summoner-info-player'>
                                <div className='summoner-info-portrait-area'>
                                    <div className='summoner-info-icon-cut'>
                                        <img
                                            // src={summonerIcons[`${this.props.summonerInfo.summonerIcon}.png`]}
                                            src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.9.1/img/profileicon/${this.props.summonerInfo.summonerIcon}.png`}
                                            alt='ProfileIco'
                                            className='summoner-info-icon'
                                        />
                                    </div>
                                    <div className='summoner-info-level'>Level {this.props.summonerInfo.summonerLevel}</div>
                                </div>
                                {this.props.summonerInfo.rank != null ? (<div className='summoner-info-rank'>
                                    <img className='summoner-info-rank-icon' src={this.getRankImg()} alt='Unranked' />
                                    <div className='summoner-info-rank-text'>
                                        {this.props.summonerInfo.rank.tier}
                                        {this.props.summonerInfo.rank.rank}
                                    ({this.props.summonerInfo.rank.leaguePoints} LP)
                                    </div>
                                </div>) :
                                    (<div className='summoner-info-rank'>
                                        Unranked
                                    </div>)}
                                <div className='summoner-info-items'>
                                    <div className='summoner-info-name'>{this.props.summonerInfo.summonerName}</div>
                                    {this.props.summonerInfo.rank != null ? (
                                        <>
                                            <div className='summoner-info-total-games'>Total Games: {this.summonerGameCalc()[0]}</div>
                                            <div className='summoner-info-win-lose'>W: {this.props.summonerInfo.rank.wins} L: {this.props.summonerInfo.rank.losses}</div>
                                            <div className='summoner-info-win-ratio'>Win Rate: {this.summonerGameCalc()[1]}%</div>
                                        </>)
                                        :
                                        <div className='summoner-info-no-rank'>No Rank Info</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='summoner-info-history'>
                            <Infinite elementHeight={200} useWindowAsScrollContainer>
                                {this.loadMatches()}
                            </Infinite>
                        </div>
                        <div className='summoner-info-mastery'></div>
                    </div>
                ) :
                    (
                        <div className="rotation-loading">
                            <ClipLoader
                                css={override}
                                size={150}
                                color={"#123abc"}
                                loading={this.props.loading}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
        region: state.search.region,
        summonerInfo: state.summonerInfo.summonerInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSummonerInfo: (...args) => dispatch(getSummonerInfo(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    SummonerInfo
);
