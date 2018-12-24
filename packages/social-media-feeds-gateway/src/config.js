const Config = {
  name: "config",
  actions: {
    get: {
      params: {
        password: "string"
      },
      handler: ctx => {
        if (process.env.SECRET_KEY === ctx.params.password) {
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
          throw new Error("Wrong password!");
        }
      }
    }
  }
};

export { Config };
