const Events = {
  name: "events",
  actions: {
    get: {
      params: {
        password: "string",
        userId: "string"
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
        return [...facebookEvents];
      }
    }
  }
};

export { Events };
