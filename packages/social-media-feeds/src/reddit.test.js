import { Reddit } from "./reddit";

it("Should get events", async () => {
  const { REDDIT_USERNAME } = process.env;

  const reddit = new Reddit(REDDIT_USERNAME);
  const events = await reddit.getEvents();

  expect(events.length).toBeGreaterThan(1);
});
