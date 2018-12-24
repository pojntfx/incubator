import { GitLab } from "./gitlab";

it("Should get events", async () => {
  const gitlab = new GitLab("pojntfx", "gitlab.com");
  const events = await gitlab.getEvents();
  expect(events[0].author_username).toBe("pojntfx");
});
