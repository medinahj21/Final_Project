import { GET_GROUPS, GET_GROUP_DETAIL } from "../actions/actions";

const initialState = {
    groups: [],
    groupDetail: [],
};


export default function groupReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: payload
            }
        case GET_GROUP_DETAIL:
            return {
                ...state,
                groupDetail: payload,
            }
        default:
            return state
    }
};



