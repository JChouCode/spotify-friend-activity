const fetch = require('node-fetch')

exports.getWebAccessToken = async function getWebAccessToken(spDcCookie) {
  const res = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
    headers: {
      Cookie: `sp_dc=${spDcCookie}`
    }
  })

  return res.json()
}

exports.getFriendActivity = async function getFriendActivity(webAccessToken) {
  const res = await
    fetch('https://guc-spclient.spotify.com/presence-view/v1/buddylist', {
      headers: {
        Authorization: `Bearer ${webAccessToken}`
      }
    })

  return res.json()
}

// Deploy middleman server that hits the get access token, hit that server for fetching
