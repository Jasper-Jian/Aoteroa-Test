import {createAction} from 'redux-actions';

export const addBoat = new createAction('ADD_BOAT')

export const editBoat = new createAction('EDIT_BOAT')

export const deleteBoat = new createAction('DELETE_BOAT')

export const toggleWoker = new createAction('TOGGLE_WORKER')
