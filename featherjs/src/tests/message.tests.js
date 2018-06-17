import { app } from "../index";

/**
 * Test the Messages service
 */
export async function testMessages() {
  await app.service("messages").create({
    text: "First message"
  });

  await app.service("messages").create({
    text: "Second message"
  });

  const messageList = await app.service("messages").find();

  console.log("Available messages:", messageList);
}
