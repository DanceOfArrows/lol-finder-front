import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { getSummonerInfo } from '../redux/summonerInfo';
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

const summonerSpells = {
    21: 'SummonerBarrier',
    1: 'SummonerBoost',
    14: 'SummonerDot',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    13: 'SummonerMana',
    30: 'SummonerPoroRecall',
    31: 'SummonerPoroThrow',
    11: 'SummonerSmite',
    39: 'SummonerSnowURFSnowball_Mark',
    32: 'SummonerSnowball',
    12: 'SummonerTeleport',
}

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

    // Send back win ratio, total games, etc.
    summonerGameCalc() {
        const wins = this.props.summonerInfo.rank.wins;
        const losses = this.props.summonerInfo.rank.losses;

        const totalGames = wins + losses;
        const winRatio = (Math.floor(((wins / totalGames) * 100) * 100) / 100);

        return [totalGames, winRatio];
    }

    convertRatio(k, d, a) {
        if (d === 0) return 'Perfect';
        return (Math.floor(((k + a) / d) * 100) / 100);
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
                                            src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/profileicon/${this.props.summonerInfo.summonerIcon}.png`}
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
                            {
                                Object.keys(this.props.summonerInfo.matchHistory).map(matchIdx => {
                                    const match = this.props.summonerInfo.matchHistory[matchIdx];
                                    const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${match.champion}_0.jpg`;
                                    let currentPlayerId;
                                    let currentPlayer;

                                    match.matchData.participantIdentities.forEach(player => {
                                        if (player.summoner.summonerName === this.props.summonerInfo.summonerName) currentPlayerId = player.participantId;
                                    })

                                    match.matchData.participants.forEach(player => {
                                        if (player.participantId === currentPlayerId) currentPlayer = player;
                                    })

                                    // p = player | i = identity
                                    const [p0i, p1i, p2i, p3i, p4i, p5i, p6i, p7i, p8i, p9i] = match.matchData.participantIdentities;
                                    const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9] = match.matchData.participants;

                                    const t0 = [[p0i, p0], [p1i, p1], [p2i, p2], [p3i, p3], [p4i, p4]];
                                    const t1 = [[p5i, p5], [p6i, p6], [p7i, p7], [p8i, p8], [p9i, p9]];

                                    const divWinColor = {
                                        backgroundColor: 'rgba(80, 170, 255, 0.20)',
                                    };

                                    const divLoseColor = {
                                        backgroundColor: 'rgba(180, 0, 0, 0.20)',
                                    };

                                    return (
                                        <div className='summoner-info-match' key={`match-${matchIdx}`} style={currentPlayer.stats.win ? divWinColor : divLoseColor}>
                                            <div className='match-icons'>
                                                <div className='match-champion-icon-area'>
                                                    <div className='match-champion-icon-cut'>
                                                        <img src={champImgSrc} alt='ChampIco' />
                                                    </div>
                                                </div>
                                                <div className='match-summoner-spells'>
                                                    <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/summonerspell/${summonerSpells[currentPlayer.spell1Id]}.png`} alt='summonerSpellIco' />
                                                    <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/summonerspell/${summonerSpells[currentPlayer.spell2Id]}.png`} alt='summonerSpellIco' />
                                                </div>
                                                <div className='match-items'>
                                                    <div className='match-items-row-top'>
                                                        {
                                                            currentPlayer.stats.item0 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item0}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                        {
                                                            currentPlayer.stats.item1 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item1}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                        {
                                                            currentPlayer.stats.item2 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item2}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                    </div>
                                                    <div className='match-items-row-bottom'>
                                                        {
                                                            currentPlayer.stats.item3 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item3}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                        {
                                                            currentPlayer.stats.item4 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item4}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                        {
                                                            currentPlayer.stats.item5 !== 0 ?
                                                                <img src={`https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/10.15.1/img/item/${currentPlayer.stats.item5}.png`}
                                                                    alt='itemIco' />
                                                                :
                                                                <div className='match-no-item' />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='match-stats'>
                                                <div className='match-stats-num'>{currentPlayer.stats.kills} / {currentPlayer.stats.deaths} / {currentPlayer.stats.assists}</div>
                                                <div className='match-stats-ratio'>{this.convertRatio(currentPlayer.stats.kills, currentPlayer.stats.deaths, currentPlayer.stats.assists)} KDA</div>
                                            </div>
                                            <div className='match-participants'>
                                                <div className='match-participants-t0'>
                                                    {t0.map((player, idx) => {
                                                        const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${player[1].championName}_0.jpg`
                                                        const encodedSummonerName = encodeURI(player[0].summoner.summonerName);

                                                        if (player[0].participantId === currentPlayerId) return (
                                                            <div className={`match-participants-player${idx + 1}`}>
                                                                <div className='match-participant-imageContainer'>
                                                                    <img className='match-participant-image' src={champImgSrc} alt='champIco' />
                                                                    <div className='match-participant-nameCurrent'>{player[0].summoner.summonerName}</div>
                                                                </div>
                                                            </div>
                                                        )

                                                        return (
                                                            <div className={`match-participants-player${idx + 1}`}>
                                                                <div className='match-participant-imageContainer'>
                                                                    <img className='match-participant-image' src={champImgSrc} alt='champIco' />
                                                                    <NavLink to={`/summoner/${encodedSummonerName}`} className='match-participant-name'>{player[0].summoner.summonerName}</NavLink>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className='match-participants-t1'>
                                                    {t1.map((player, idx) => {
                                                        const champImgSrc = `https://lol-finder.s3-us-west-1.amazonaws.com/DataDragon/img/champion/tiles/${player[1].championName}_0.jpg`
                                                        const encodedSummonerName = encodeURI(player[0].summoner.summonerName);

                                                        if (player[0].participantId === currentPlayerId) return (
                                                            <div className={`match-participants-player${idx + 1}`}>
                                                                <div className='match-participant-imageContainer'>
                                                                    <img className='match-participant-image' src={champImgSrc} alt='champIco' />
                                                                    <div className='match-participant-nameCurrent'>{player[0].summoner.summonerName}</div>
                                                                </div>
                                                            </div>
                                                        )

                                                        return (
                                                            <div className={`match-participants-player${idx + 1}`}>
                                                                <div className='match-participant-imageContainer'>
                                                                    <img className='match-participant-image' src={champImgSrc} alt='champIco' />
                                                                    <NavLink to={`/summoner/${encodedSummonerName}`} className='match-participant-name'>{player[0].summoner.summonerName}</NavLink>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
