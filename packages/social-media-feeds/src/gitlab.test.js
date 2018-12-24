import { GitLab } from "./gitlab";

it("Should get events", async () => {
  const { GITLAB_USERNAME, GITLAB_URL } = process.env;

  const gitlab = new GitLab(GITLAB_USERNAME, GITLAB_URL);
  const events = await gitlab.getEvents();

  expect(events[0].author_username).toBe(GITLAB_USERNAME);
});
