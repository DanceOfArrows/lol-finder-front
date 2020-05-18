import { baseUrl } from '../config';
import { setLoadStateFalse, setLoadStateTrue } from './app';

const LOAD_SUMMONER_DATA = 'lolfinder/summonerInfo/LOAD_SUMMONER_DATA'

export const loadSummoner = (data) => ({ type: LOAD_SUMMONER_DATA, data })

export const getSummonerInfo = (name, region) => async dispatch => {
    dispatch(setLoadStateTrue());

    if (!region) region = 'NA1';

    const res = await fetch(`${baseUrl}/info/${region}/${name}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSummoner(data));
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

        default: return state;
    }
}