import {
  fetchGif,
  uploadGif,
  gifStatus,
} from '../../services/gifService';

import * as types from './actionTypes';

const gifStarted = () => {
  return {
    type: types.GIF_REQUESTED,
  };
}

const gifError = () => {
  return {
    type: types.GIF_ERROR,
  };
}

const gifFinished = () => {
  return {
    type: types.GIF_FINISHED,
  };
}

const setGif = (gif) => {
  return {
    type: types.SET_GIF,
    payload: gif,
  };
}

const setStatus = (status) => {
  return {
    type: types.SET_STATUS,
    payload: status,
  };
}

export const getGif = (url) => {
  return function (dispatch) {
    dispatch(gifStarted());
    return uploadGif(url).then((gif) => {
      dispatch(setGif(gif));
      dispatch(pollGif(gif.gfyname))
      return gif;
    },
    (error) => {
      dispatch(gifError())
    })
  }
}

const pollGif = (name) => {
  return function (dispatch) {
    return gifStatus(name).then((status) => {
      dispatch(setStatus(status));
      if (status.task === "complete") {
        dispatch(gifFinished());
      } else if (status.task === "error") {
        throw Error(status.errorMessage.description);
      } else {
        setTimeout(() => {
          dispatch(pollGif(name));
        }, 2000);
      }
      return status;
    },
    (error) => {
      dispatch(gifError())
    })
  }
}
