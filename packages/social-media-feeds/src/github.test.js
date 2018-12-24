import { GitHub } from "./github";

it("Should get events", async () => {
  const github = new GitHub("pojntfx");
  const events = await github.getEvents();
  expect(events[0].actor.login).toBe("pojntfx");
});
