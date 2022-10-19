import { GET_GROUPS, GET_GROUP_DETAIL, CLEAN_PRODUCT_DETAIL, UPDATE_GROUP } from "../actions/actions";

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
            };
        case GET_GROUP_DETAIL:
            return {
                ...state,
                groupDetail: payload,
            };
        case CLEAN_PRODUCT_DETAIL:
            return {
                ...state,
                groupDetail: [],
            };
        case UPDATE_GROUP:
            return {
                ...state
            }
        default:
            return state
    }
};



