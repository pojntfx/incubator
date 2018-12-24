import { Twitter } from "./twitter";

it("Should get events", async () => {
  const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET_KEY,
    TWITTER_USERNAME
  } = process.env;

  const twitter = new Twitter(
    TWITTER_API_KEY,
    TWITTER_API_SECRET_KEY,
    TWITTER_USERNAME
  );
  const events = await twitter.getEvents();

  expect(events[0].actor).toBe(TWITTER_USERNAME);
});
