const Stories = {
  name: "stories",
  actions: {
    get: {
      params: {
        password: "string",
        userName: "string"
      },
      handler: async ctx => {
        const {
          instagram: { sessionToken }
        } = await ctx.call("config.get", {
          password: ctx.params.password
        });
        const instagramStories = await ctx.call("instagram.getStories", {
          sessionId: sessionToken,
          userName: ctx.params.userName
        });
        return [...instagramStories];
      }
    }
  }
};

export { Stories };
