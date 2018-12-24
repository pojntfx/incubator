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
        return gitlab
          .getEvents()
          .then(events =>
            events.sort((a, b) =>
              a.time > b.time ? -1 : a.time < b.time ? 1 : 0
            )
          );
      },
      cache: true
    }
  }
};

export { GitLab };
