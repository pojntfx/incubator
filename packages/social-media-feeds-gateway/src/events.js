const Events = {
  name: "events",
  actions: {
    get: {
      params: {
        authorization: "string",
        userId: "string",
        userName: "string",
        gitlabUrl: "string"
      },
      handler: async ctx => {
        const {
          facebook: { accessKey },
          instagram: { sessionToken },
          twitter: { apiKey, apiSecretKey }
        } = await ctx.call("config.get", {
          authorization: ctx.params.authorization
        });
        const facebookEvents = await ctx.call("facebook.get", {
          accessKey,
          userId: ctx.params.userId
        });
        const githubEvents = await ctx.call("github.get", {
          userName: ctx.params.userName
        });
        const gitlabEvents = await ctx.call("gitlab.get", {
          url: ctx.params.gitlabUrl,
          userName: ctx.params.userName
        });
        const instagramEvents = await ctx.call("instagram.get", {
          sessionId: sessionToken,
          userName: ctx.params.userName
        });
        const redditEvents = await ctx.call("reddit.get", {
          userName: ctx.params.userName
        });
        const twitterEvents = await ctx.call("twitter.get", {
          apiKey,
          apiSecretKey,
          userName: ctx.params.userName
        });
        return [
          ...facebookEvents,
          ...githubEvents,
          ...gitlabEvents,
          ...instagramEvents,
          ...redditEvents,
          ...twitterEvents
        ].sort((a, b) => (a.time > b.time ? -1 : a.time < b.time ? 1 : 0));
      },
      cache: true
    }
  }
};

export { Events };
