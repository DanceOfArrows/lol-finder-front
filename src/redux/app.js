const SET_LOAD_STATE_FALSE = 'lolfinder/app/SET_LOAD_STATE_FALSE';
const SET_LOAD_STATE_TRUE = 'lolfinder/app/SET_LOAD_STATE_TRUE';

export const setLoadFalse = () => ({ type: SET_LOAD_STATE_FALSE, loading: false });
export const setLoadTrue = () => ({ type: SET_LOAD_STATE_TRUE, loading: true });

export const setLoadStateFalse = () => async dispatch => {
    dispatch(setLoadFalse());
};

export const setLoadStateTrue = () => async dispatch => {
    dispatch(setLoadTrue());
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_LOAD_STATE_FALSE: {
            return {
                ...state,
                loading: action.loading,
            };
        }
        case SET_LOAD_STATE_TRUE: {
            return {
                ...state,
                loading: action.loading,
            };
        }

        default: return state;
    }
}