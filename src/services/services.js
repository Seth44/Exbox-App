const myHeaders = new Headers({
  "X-AUTH": "fb4167c0e40029cb754f1701808a9fd4fcfcd918",
  "Access-Control-Allow-Origin": "no-cors"
});

const authenticate = () => {
  fetch('https://xboxapi.com/v2/accountxuid', {
      headers: myHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
}

function fetchXuid(gamertag) {
  return fetch('https://xboxapi.com/v2/xuid/' + gamertag, {
    headers: myHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    if (myJson.error_code) throw Error(myJson.error_message);
    return myJson;
  });
}

function fetchProfile(xuid) {
  return fetch('https://xboxapi.com/v2/' + xuid + '/profile', {
    headers: myHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    if (myJson.error_code) throw Error(myJson.error_message);
    return myJson;
  });
}

function fetchClips(xuid) {
  return fetch('https://xboxapi.com/v2/' + xuid + '/game-clips', {
    headers: myHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    if (myJson.error_code) throw Error(myJson.error_message);
    return myJson;
  });
}

function fetchScreenshots(xuid) {
  return fetch('https://xboxapi.com/v2/' + xuid + '/screenshots', {
    headers: myHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    // if (myJson.error_code) throw Error(myJson.error_message);
    return myJson;
  });
}


export { 
  authenticate,
  fetchXuid,
  fetchProfile,
  fetchClips,
  fetchScreenshots 
};
