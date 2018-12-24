import { GitHub } from "./github";

it("Should get events", async () => {
  const { GITHUB_USERNAME } = process.env;

  const github = new GitHub(GITHUB_USERNAME);
  const events = await github.getEvents();

  expect(events[0].actor.login).toBe(GITHUB_USERNAME);
});
