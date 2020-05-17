const SUBMIT_TRUE = 'lolfinder/search/SUBMIT_TRUE';
const SUBMIT_FALSE = 'lolfinder/search/SUBMIT_FALSE';
const SET_REGION = 'lolfinder/search/SET_REGION';

export const changeSubmitTrue = () => ({ type: SUBMIT_TRUE });
export const changeSubmitFalse = () => ({ type: SUBMIT_FALSE });
export const setRegion = region => ({ type: SET_REGION, region })

export const submitSearch = () => async dispatch => {
    dispatch(changeSubmitTrue());
};

export const changeRegion = (region) => async dispatch => {
    dispatch(setRegion(region));
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SUBMIT_TRUE: {
            return {
                ...state,
                searchSubmitted: true,
            };
        }
        case SUBMIT_FALSE: {
            return {
                ...state,
                searchSubmitted: false,
            }
        }
        case SET_REGION: {
            return {
                ...state,
                region: action.region,
            }
        }
        default: return state;
    }
}