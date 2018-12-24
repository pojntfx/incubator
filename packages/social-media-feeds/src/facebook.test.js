import { Facebook } from "./facebook";

it("Should get events", async () => {
  const { FACEBOOK_ACCESS_KEY, FACEBOOK_USERID } = process.env;

  const facebook = new Facebook(FACEBOOK_ACCESS_KEY, FACEBOOK_USERID);
  const events = await facebook.getEvents();

  expect(events.data.length).toBeGreaterThan(1);
});
