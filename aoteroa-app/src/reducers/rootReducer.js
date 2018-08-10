import { combineReducers } from 'redux';
import * as boatList from './boatListReducer';
export default combineReducers({
 ...boatList,
});
