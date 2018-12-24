import { Reddit } from "./reddit";

it("Should get events", async () => {
  const reddit = new Reddit("PojntFX");
  const events = await reddit.getEvents();
  expect(events.length).toBeGreaterThan(1);
});
