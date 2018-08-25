import { 
  fetchXuid,
  fetchProfile,
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

const setProfile = (profile) => {
  return {
    type: types.SET_PROFILE,
    payload: profile,
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

export const searchGamertag = (gamertag, redirect) => {
  return function (dispatch, getState) {
    dispatch(searchStarted());
    dispatch(setGamertag(gamertag));
    return dispatch(
      getXuid(gamertag)
    ).then((xuid) => {
      if (!xuid) xuid = getState().currentUser.xuid;
      return Promise.all([
        dispatch(getProfile(xuid)),
        dispatch(getClips(xuid)),
        dispatch(getScreenshots(xuid)),
      ])
    }
    ).then(() => {
      dispatch(searchFinished())
      const currentUrl = (redirect) ? `/${gamertag}/${redirect}` : `/${gamertag}/dashboard`
      history.push(currentUrl);
    });    
  }
}

const getXuid = (gamertag) => {
  return (dispatch) => {
    const localXuid = localStorage.getItem(gamertag.toLowerCase());
    if (localXuid) {
      return new Promise(resolve => {
        dispatch(setXuid(localXuid));
        setTimeout(resolve, 10)
      });
    }
    return fetchXuid(gamertag).then((xuid) => {
      dispatch(setXuid(xuid));
      localStorage.setItem(gamertag, xuid);
      return xuid;
    },
    (error) => {
      dispatch(searchError())
    })
  }
}

const getProfile = (xuid) => {
  return function (dispatch) {
    return fetchProfile(xuid).then((profile) => {
      dispatch(setProfile(profile));
      return profile;
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
