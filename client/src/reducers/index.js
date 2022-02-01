import { combineReducers } from 'redux';

import posts from './posts.js';
import auth from './auth.js';
import flash from './flash.js';

export default combineReducers({ 
   posts, auth, flash
});