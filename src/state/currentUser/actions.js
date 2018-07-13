import { 
  fetchXuid,
  fetchClips,
  fetchScreenshots
} from '../../services/services';

import { history } from '../../store'
import * as types from './actionTypes';

const searchStarted = () => {
  return {
    type: types.SEARCH_REQUESTED,
  };
}

const searchError = () => {
  return {
    type: types.SEARCH_ERROR,
  };
}

const searchFinished = () => {
  return {
    type: types.SEARCH_FINISHED,
  };
}

const setXuid = (xuid) => {
  return {
    type: types.SET_XUID,
    payload: xuid,
  };
}

const setGamertag = (gamertag) => {
  return {
    type: types.SET_GAMERTAG,
    payload: gamertag,
  };
}

const setClips = (clips) => {
  return {
    type: types.SET_CLIPS,
    payload: clips,
  };
}

const setScreenshots = (screenshots) => {
  return {
    type: types.SET_SCREENSHOTS,
    payload: screenshots,
  };
}

export const searchGamertag = (gamertag) => {
  return function (dispatch) {
    dispatch(searchStarted());
    dispatch(setGamertag(gamertag));
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
