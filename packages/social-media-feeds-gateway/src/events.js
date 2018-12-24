const Events = {
  name: "events",
  actions: {
    get: {
      params: {
        password: "string",
        userId: "string",
        userName: "string",
        gitlabUrl: "string"
      },
      handler: async ctx => {
        const {
          facebook: { accessKey }
        } = await ctx.call("config.get", {
          password: ctx.params.password
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
        return [...facebookEvents, ...githubEvents, ...gitlabEvents];
      }
    }
  }
};

export { Events };
