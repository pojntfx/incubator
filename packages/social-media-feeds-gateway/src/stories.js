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
        return [...instagramStories].then(stories =>
          stories.sort((a, b) =>
            a.time > b.time ? -1 : a.time < b.time ? 1 : 0
          )
        );
      },
      cache: true
    }
  }
};

export { Stories };
