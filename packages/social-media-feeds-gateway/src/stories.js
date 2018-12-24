const Stories = {
  name: "stories",
  actions: {
    get: {
      params: {
        authorization: "string",
        userName: "string"
      },
      handler: async ctx => {
        const {
          instagram: { sessionToken }
        } = await ctx.call("config.get", {
          authorization: ctx.params.authorization
        });
        const instagramStories = await ctx.call("instagram.getStories", {
          sessionId: sessionToken,
          userName: ctx.params.userName
        });
        return [...instagramStories];
      },
      cache: true
    }
  }
};

export { Stories };
