import { GET_GROUPS, GET_GROUP_DETAIL, CLEAN_PRODUCT_DETAIL, UPDATE_GROUP, GET_ROLE_REQUESTS, CLEAN_ROLE_REQUESTS } from "../actions/actions";

const initialState = {
    groups: [],
    groupDetail: [],
    roleRequests: []
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
        case GET_ROLE_REQUESTS:
            return{
                ...state,
                roleRequests: payload
            }
        case CLEAN_ROLE_REQUESTS:
            return{
                ...state,
                roleRequests: []
            }
        default:
            return state
    }
};



