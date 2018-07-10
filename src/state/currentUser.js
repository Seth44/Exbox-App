import { 
  fetchXuid,
  fetchClips,
  fetchScreenshots
} from '../services/services';

import { history } from '../store'

export const SET_XUID = 'currentUser/SET_XUID';
export const SET_CLIPS = 'currentUser/SET_CLIPS';
export const SET_SCREENSHOTS = 'currentUser/SET_SCREENSHOTS';

export const SEARCH_ERROR = 'currentUser/SEARCH_ERROR';
export const SEARCH_REQUESTED = 'currentUser/SEARCH_REQUESTED';
export const SEARCH_FINISHED = 'currentUser/SEARCH_FINISHED';

const initialState = {
  isSearching: false,
  searchError: null,
  xuid: null,
  clips: null,
  screenshots: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        isSearching: true,
        searchError: false,
      }

    case SET_XUID:
      return {
        ...state,
        xuid: action.payload,
      }

    case SET_CLIPS:
      return {
        ...state,
        clips: action.payload,
      }

    case SET_SCREENSHOTS:
      return {
        ...state,
        screenshots: action.payload,
      }

    case SEARCH_FINISHED:
      return {
        ...state,
        isSearching: false,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        searchError: true,
      }

    default:
      return state
  }
}

const searchStarted = () => {
  return {
    type: SEARCH_REQUESTED,
  };
}

const searchError = () => {
  return {
    type: SEARCH_ERROR,
  };
}

const searchFinished = () => {
  return {
    type: SEARCH_FINISHED,
  };
}

const setXuid = (xuid) => {
  return {
    type: SET_XUID,
    payload: xuid,
  };
}

const setClips = (clips) => {
  return {
    type: SET_CLIPS,
    payload: clips,
  };
}

const setScreenshots = (screenshots) => {
  return {
    type: SET_SCREENSHOTS,
    payload: screenshots,
  };
}

export const searchGamertag = (gamertag) => {
  return function (dispatch) {
    dispatch(searchStarted());
    return dispatch(
      getXuid(gamertag)
    ).then((xuid) => 
      Promise.all([
        dispatch(getClips(xuid)),
        dispatch(getScreenshots(xuid)),
      ])
    ).then(() => {
      dispatch(searchFinished())
      history.push('/dashboard');
    });    
  }
}

const getXuid = (gamertag) => {
  return (dispatch) => {
    return fetchXuid(gamertag).then((xuid) => {
      dispatch(setXuid(xuid));
      return xuid;
    },
    (error) => {
      dispatch(searchError())
    })
  }
}

const getClips = (xuid) => {
  return function (dispatch) {
    return fetchClips(xuid).then((clips) => {
      dispatch(setClips(clips));
      return clips;
    },
    (error) => {
      dispatch(searchError())
    })
  }
}

const getScreenshots = (xuid) => {
  return function (dispatch) {
    return fetchScreenshots(xuid).then((screenshots) => {
      dispatch(setScreenshots(screenshots));
      return screenshots;
    },
    (error) => {
      dispatch(searchError())
    })
  }
}
