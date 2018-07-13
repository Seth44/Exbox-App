import * as types from './actionTypes';

const initialState = {
  isSearching: false,
  searchError: null,
  xuid: null,
  gamertag: null,
  clips: null,
  screenshots: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_REQUESTED:
      return {
        ...state,
        isSearching: true,
        searchError: false,
      }

    case types.SET_XUID:
      return {
        ...state,
        xuid: action.payload,
      }

    case types.SET_GAMERTAG:
      return {
        ...state,
        gamertag: action.payload,
      }

    case types.SET_CLIPS:
      return {
        ...state,
        clips: action.payload,
      }

    case types.SET_SCREENSHOTS:
      return {
        ...state,
        screenshots: action.payload,
      }

    case types.SEARCH_FINISHED:
      return {
        ...state,
        isSearching: false,
      }
    case types.SEARCH_ERROR:
      return {
        ...state,
        searchError: true,
      }

    default:
      return state
  }
}