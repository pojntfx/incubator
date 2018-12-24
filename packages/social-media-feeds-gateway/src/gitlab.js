import { GitLab as GitLabClient } from "@pojntfx-incubator/social-media-feeds-core";

const GitLab = {
  name: "gitlab",
  actions: {
    get: {
      params: {
        userName: "string",
        url: "string"
      },
      handler: async ctx => {
        const gitlab = new GitLabClient(ctx.params.userName, ctx.params.url);
        return gitlab.getEvents();
      }
    }
  }
};

export { GitLab };
