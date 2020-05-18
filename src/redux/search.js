const SET_REGION = 'lolfinder/search/SET_REGION';

export const setRegion = region => ({ type: SET_REGION, region })

export const changeRegion = (region) => async dispatch => {
    dispatch(setRegion(region));
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_REGION: {
            return {
                ...state,
                region: action.region,
            }
        }
        default: return state;
    }
}