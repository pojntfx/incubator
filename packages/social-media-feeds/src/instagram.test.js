import { Instagram } from "./instagram";

it("Should get events", async () => {
  const { INSTAGRAM_SESSION_TOKEN, INSTAGRAM_USERNAME } = process.env;

  const instagram = new Instagram(INSTAGRAM_SESSION_TOKEN, INSTAGRAM_USERNAME);
  const events = await instagram.getEvents();

  expect(events[0].actor).toBe(INSTAGRAM_USERNAME);
});

it("Should get stories", async () => {
  const { INSTAGRAM_SESSION_TOKEN, INSTAGRAM_USERNAME } = process.env;

  const instagram = new Instagram(INSTAGRAM_SESSION_TOKEN, INSTAGRAM_USERNAME);
  const stories = await instagram.getStories();

  expect(stories[0].actor).toBe(INSTAGRAM_USERNAME);
});
