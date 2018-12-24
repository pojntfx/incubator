const Config = {
  name: "config",
  actions: {
    get: {
      params: {
        authorization: "string"
      },
      handler: ctx => {
        if (process.env.SECRET_KEY === ctx.params.authorization) {
          return {
            twitter: {
              apiKey: process.env.TWITTER_API_KEY,
              apiSecretKey: process.env.TWITTER_API_SECRET_KEY
            },
            facebook: {
              accessKey: process.env.FACEBOOK_ACCESS_KEY
            },
            instagram: {
              sessionToken: process.env.INSTAGRAM_SESSION_TOKEN
            }
          };
        } else {
          throw new Error("Invalid authorization key!");
        }
      },
      cache: true
    }
  }
};

export { Config };
