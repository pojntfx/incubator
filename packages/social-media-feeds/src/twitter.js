import fetch from "node-fetch";

class Twitter {
  constructor(apiKey, apiSecretKey, userName) {
    this.apiKey = apiKey;
    this.apiSecretKey = apiSecretKey;
    this.userName = userName;
  }

  getEvents() {
    return this.__getOAuthToken()
      .then(token =>
        fetch(
          `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${
            this.userName
          }`,
          {
            withCredentials: true,
            credentials: "include",
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
      )
      .then(data => data.json());
  }

  __getOAuthToken() {
    return fetch(
      `https://${this.apiKey}:${
        this.apiSecretKey
      }@api.twitter.com/oauth2/token?grant_type=client_credentials`,
      {
        method: "POST"
      }
    )
      .then(data => data.json())
      .then(data => data.access_token);
  }
}

export { Twitter };
