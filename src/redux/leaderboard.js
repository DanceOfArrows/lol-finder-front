import { baseUrl } from '../config';
import { setLoadStateFalse, setLoadStateTrue } from './app';

const LOAD_LEADERBOARD = 'lolfinder/leaderboard/LOAD_LEADERBOARD';

export const loadLeaderboard = leaderboard => ({ type: LOAD_LEADERBOARD, leaderboard });

export const getLeaderboard = () => async dispatch => {
    dispatch(setLoadStateTrue());
    const res = await fetch(`${baseUrl}/leaderboard/NA1`);

    if (res.ok) {
        const leaderboard = await res.json();
        leaderboard.sort((a, b) => {
            return a.leaguePoints > b.leaguePoints ? -1 : 1;
        })
        dispatch(loadLeaderboard(leaderboard));
        dispatch(setLoadStateFalse());
    };
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_LEADERBOARD: {
            return {
                ...state,
                leaderboard: action.leaderboard,
            };
        }
        default: return state;
    }
}