import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT, UPDATEDTRUE, UPDATEDFALSE } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [], post: null, updated: false }, action) => {  // posts is the state
    switch (action.type) {
        case START_LOADING: 
            return { ... state, isLoading: true };
        case END_LOADING:
            return { ... state, isLoading: false };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }; // set posts to the payload (the fetched posts) from the action
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload ] }; 
        case UPDATE:
        case LIKE:
            // return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
            return { ...state, post: state.post._id === action.payload._id ? action.payload : state.post, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case UPDATEDTRUE: 
            return { ...state, updated: true }
        case UPDATEDFALSE: 
            return { ...state, updated: false }
        case COMMENT: 
            // return { ...state, post: (action.payload._id === state.post._id ? action.payload : state.post) };
            // return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
            return state;
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}