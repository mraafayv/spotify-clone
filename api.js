const CLIENT_ID = '94d397db951549bbae0e8996e31aafc3';
const CLIENT_SECRET = '58037c60e9cd4e30b35cbd0eb09d49e9';

// Generates a token
async function getToken() {

  let response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
  });
  const data = await response.json();
  let token = data.access_token;

  return token;
}


// Gets Tracks from API
async function getTrackData(query) {
  let token = await getToken();
  let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });
  
  let data = await response.json();
  // console.log(data);
  return data.tracks['items'];
}

// getTrackData('Atif');

function playAudio(url) {
  const audio = new Audio(url);

  audio.play();
  // audio.pause();
}

