import { baseUrl } from '../config';
import { setLoadStateFalse, setLoadStateTrue } from './app';
import { changeSubmitFalse } from './search';

const LOAD_SUMMONER_DATA = 'lolfinder/summonerInfo/LOAD_SUMMONER_DATA'

export const loadSummoner = (data) => ({ type: LOAD_SUMMONER_DATA, data })

export const getSummonerHistory = (name, region) => async dispatch => {
    dispatch(setLoadStateTrue());
    dispatch(changeSubmitFalse());

    if (!region) region = 'NA1';

    const res = await fetch(`${baseUrl}/match-history/${region}/${name}`);

    console.log(res)

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(loadSummoner(data));
    };
    // TODO: Error Handling

    dispatch(setLoadStateFalse());
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SUMMONER_DATA: {
            return {
                ...state,
                matchHistory: action.data,
            }
        }

        default: return state;
    }
}