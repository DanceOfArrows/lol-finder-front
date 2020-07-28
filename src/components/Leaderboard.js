import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import { getLeaderboard } from '../redux/leaderboard';
import './styles/Leaderboard.css';

const override = css`
  border-color: #C44017;
`;

const Leaderboard = (props) => {
    const { getLeaderboard } = props;
    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard])

    const summonerGameCalc = (wins, losses) => {
        const totalGames = wins + losses;
        const winRatio = + (Math.floor(((wins / totalGames) * 100) * 100) / 100);

        return winRatio;
    }

    return (
        <div className='body-content'>
            {props.leaderboard && !props.loading ? (
                <div className='leaderboard-container'>
                    <div className='leaderboard-summoner-container leaderboard-title'>
                        <div className='leaderboard-display-rank'>Rank</div>
                        <div className='leaderboard-display-name'>Name</div>
                        <div className='leaderboard-display-leaguePoint'>LP</div>
                        <div className='leaderboard-display-winRate'>Win Rate</div>
                    </div>
                    {props.leaderboard.map((summoner, idx) => {
                        const urlName = encodeURI(summoner.summonerName);
                        if (idx === 299) {
                            return (
                                <div className='leaderboard-summoner-container leaderboard-last' key={summoner.summonerName}>
                                    <div className='leaderboard-summoner-rank'>{idx + 1}</div>
                                    <div className='leaderboard-summoner-name-container'>
                                        <NavLink className='leaderboard-summoner-name' to={`/summoner/${urlName}`}>
                                            {summoner.summonerName}
                                        </NavLink>
                                    </div>
                                    <div className='leaderboard-summoner-leaguePoint'>{summoner.leaguePoints}</div>
                                    <div className='leaderboard-summoner-winRate'>{summonerGameCalc(summoner.wins, summoner.losses)}%</div>
                                </div>
                            )
                        }
                        return (
                            <div className='leaderboard-summoner-container' key={summoner.summonerName}>
                                <div className='leaderboard-summoner-rank'>{idx + 1}</div>
                                <div className='leaderboard-summoner-name-container'>
                                    <NavLink className='leaderboard-summoner-name' to={`/summoner/${urlName}`}>
                                        {summoner.summonerName}
                                    </NavLink>
                                </div>
                                <div className='leaderboard-summoner-leaguePoint'>{summoner.leaguePoints}</div>
                                <div className='leaderboard-summoner-winRate'>{summonerGameCalc(summoner.wins, summoner.losses)}%</div>
                            </div>
                        )
                    })}
                </div>) : (
                    <div className="rotation-loading">
                        <ClipLoader
                            css={override}
                            size={150}
                            color={"#123abc"}
                            loading={props.loading}
                        />
                    </div>
                )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        leaderboard: state.leaderboard.leaderboard,
        loading: state.app.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLeaderboard: (...args) => dispatch(getLeaderboard(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Leaderboard
);
