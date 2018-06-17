import { app } from "../index";

/**
 * Log events from the Messages service
 */
export async function logMessages() {
  await app.service("messages").on("created", message => {
    console.log("Created a new message", message);
  });

  await app.service("messages").on("removed", message => {
    console.log("Deleted message", message);
  });
}
