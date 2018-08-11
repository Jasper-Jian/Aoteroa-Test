import { combineReducers } from 'redux';
import * as boatList from './boatListReducer';
import * as workerList from './boatListReducer';
export default combineReducers({
 ...boatList,
 ...workerList
});
