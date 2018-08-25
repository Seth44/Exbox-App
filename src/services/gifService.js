const myHeaders = new Headers({
  "Gifs-API-Key": "gifs5b7b84f117abf",
  "Content-Type": "application/json"
});

function fetchGif(url) {
  const data = {
    "source": url,
  }
  return fetch('https://api.gifs.com/media/import', {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
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

const gifHeaders = new Headers({
  "Content-Type": "application/json"
});

function authenticate() {
  const data =   {
    "grant_type": "client_credentials",
    "client_id": "2_uIA9B_",
    "client_secret": "RU90Zxof2tsS-MJrdn-lAY6V6N5mfmbDBDYEQ-Bl2qQ7JjoKaHHEVsOiXMFkDavH"
  }
  return fetch('https://api.gfycat.com/v1/oauth/token', {
      method: "POST",
      headers: gifHeaders,
      body: JSON.stringify(data),
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    if (myJson.error_code) throw Error(myJson.error_message);
    localStorage.setItem('gyfcatToken', myJson.access_token);
    return myJson;
  });
}

function uploadGif(url) {
  const token = localStorage.getItem('gyfcatToken');
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  const data = {
    "fetchUrl": url,
    "noMd5": "true",
  };

  return fetch('https://api.gfycat.com/v1/gfycats', {
    method: "POST",
    headers,
    body: JSON.stringify(data),
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

function gifStatus(name) {
  const token = localStorage.getItem('gyfcatToken');
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  return fetch(`https://api.gfycat.com/v1/gfycats/fetch/status/${name}`, {
    headers,
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

export { 
  fetchGif,
  authenticate,
  uploadGif,
  gifStatus,
};
