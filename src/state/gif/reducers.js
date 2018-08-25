import * as types from './actionTypes';

const initialState = {
  isGifLoading: false,
  gifError: null,
  gif: null,
  status: {
    progress: 0
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GIF_REQUESTED:
      return {
        ...state,
        isGifLoading: true,
        gifError: false,
      }

    case types.SET_GIF:
      return {
        ...state,
        gif: action.payload,
      }

    case types.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      }

    case types.GIF_FINISHED:
      return {
        ...state,
        isGifLoading: false,
      }
    case types.GIF_ERROR:
      return {
        ...state,
        gifError: true,
        isGifLoading: false,
      }

    default:
      return state
  }
}