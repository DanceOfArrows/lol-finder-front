import { baseUrl } from '../config';
import { setLoadStateFalse, setLoadStateTrue } from './app';

const LOAD_CHAMP_ROTATION = 'lolfinder/freeRotation/LOAD_CHAMP_ROTATION';

export const loadChampRotation = champRotation => ({ type: LOAD_CHAMP_ROTATION, champRotation });

export const getChampRotation = () => async dispatch => {
    dispatch(setLoadStateTrue());
    const res = await fetch(`${baseUrl}/rotation/NA1`);

    if (res.ok) {
        const champRotation = await res.json();
        dispatch(loadChampRotation(champRotation));
        dispatch(setLoadStateFalse());
    };
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_CHAMP_ROTATION: {
            return {
                ...state,
                champRotation: action.champRotation,
            };
        }
        default: return state;
    }
}