import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getLeaderboard } from '../redux/leaderboard';
import './styles/Leaderboard.css';


const Leaderboard = (props) => {
    const { getLeaderboard } = props;
    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard])

    return (
        <div className='body-content'>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        leaderboard: state.leaderboard,
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
