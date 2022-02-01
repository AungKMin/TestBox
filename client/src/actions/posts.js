import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT, UPDATEDTRUE, REMOVE, ERROR } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getPost = (id) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id); // get post from api call
        const action = {
            type: FETCH_POST,
            payload: data
        }
        dispatch(action); 
        dispatch({ type: END_LOADING });
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page); // get posts from api call
        const action = {
            type: FETCH_ALL,
            payload: data
        }
        dispatch(action); 
        dispatch({ type: END_LOADING });
    } catch (error) {
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action); 
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        const action = { 
            type: FETCH_BY_SEARCH,
            payload: data
        }
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        const action = { 
            type: CREATE,
            payload: data
        };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATEDTRUE }); // let user know that post has been updated
        const action = { 
            type: UPDATE,
            payload: data
        };
        dispatch(action);
    } catch (error) {   
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        await api.deletePost(id);
        const action = { 
            type: DELETE,
            payload: id
        };
        dispatch(action);
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => { 
    try {
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.likePost(id);
        const action = { 
            type: LIKE,
            payload: data
        };
        dispatch(action);        
    } catch (error) {
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.comment(value, id);
        const action = {
            type: COMMENT, 
            payload: data
        };
        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}