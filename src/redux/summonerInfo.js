import { baseUrl } from '../config';
import { setLoadStateFalse, setLoadStateTrue } from './app';

const LOAD_SUMMONER_DATA = 'lolfinder/summonerInfo/LOAD_SUMMONER_DATA';
const LOAD_MATCH_DATA = 'lolfinder/summonerInfo/LOAD_MATCH_DATA';

export const loadSummoner = (data) => ({ type: LOAD_SUMMONER_DATA, data });
export const loadMatchData = (matchData, idx) => ({ type: LOAD_MATCH_DATA, matchData, index: idx });

export const getSummonerInfo = (name, region) => async dispatch => {
    dispatch(setLoadStateTrue());

    if (!region) region = 'NA1';

    const res = await fetch(`${baseUrl}/info/${region}/${name}`);

    if (res.ok) {
        const data = await res.json();
        const matches = data.matchHistory;

        dispatch(loadSummoner(data));
        await Promise.all(matches.map(async (match, idx) => {
            const matchDataRes = await fetch(`${baseUrl}/match/${region}/${match.matchId}`)

            if (matchDataRes.ok) {
                const matchData = await matchDataRes.json();

                dispatch(loadMatchData(matchData, idx))
            }
        }))

        dispatch(setLoadStateFalse());
    };
    // TODO: Error Handling
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SUMMONER_DATA: {
            return {
                ...state,
                summonerInfo: action.data,
            }
        }
        case LOAD_MATCH_DATA: {
            return {
                ...state,
                summonerInfo: {
                    ...state.summonerInfo,
                    matchHistory: {
                        ...state.summonerInfo.matchHistory,
                        [action.index]: {
                            ...state.summonerInfo.matchHistory[action.index],
                            matchData: action.matchData,
                        }
                    }
                }
            }
        }
        default: return state;
    }
}