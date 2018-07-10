const myHeaders = new Headers({
  "X-AUTH": "d713766e0ae7edfb766d906180f069be288e43ed",
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
    if (myJson.error_code) throw Error(myJson.error_message);
    return myJson;
  });
}


export { authenticate, fetchXuid, fetchClips, fetchScreenshots };
