import feathers from "@feathersjs/feathers";

// Messages
import { messagesHooks } from "./hooks/message.hooks";
import { Messages } from "./services/message.service";
import { testMessages } from "./tests/message.tests";
import { logMessages } from "./logging/message.logging";

// Start the app
export const app = feathers();

// Register the message service and it's hooks, test and log it
app.use("messages", new Messages());
app.service("messages").hooks(messagesHooks);
app.hooks({
  error: context =>
    console.log(`Error in "${context.path}"."${context.method}"`)
});
testMessages();
logMessages();
