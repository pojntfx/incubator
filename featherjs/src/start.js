import feathers from "@feathersjs/feathers";
import express, {
  json,
  urlencoded,
  rest,
  errorHandler
} from "@feathersjs/express";

// Messages
import { messagesHooks } from "./hooks/message.hooks";
import { Messages } from "./services/message.service";
import { testMessages } from "./tests/message.tests";
import { logMessages } from "./logging/message.logging";

/**
 * Main Class
 */

export class MessagesMicroservice {
  /**
   * Create a new app instance
   * @param {port} param0 Port at which the app should listen on
   */
  constructor({ port }) {
    this.port = port;
    this.app = express(feathers());
  }

  /**
   * Start the app
   */
  start() {
    // Add REST functionality
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.configure(rest());
    // Register Messages
    this.app.use("messages", new Messages());
    this.app.service("messages");
    this.app.hooks(messagesHooks);
    // Test and log Messages
    testMessages(this.app);
    logMessages(this.app);
    // Handle errors
    this.app.hooks({
      error: context =>
        console.log(`Error in "${context.path}"."${context.method}"`)
    });
    // Add express's error handler
    this.app.use(errorHandler());
    // Start the express server on specified port
    this.server = this.app.listen(this.port);
  }
}
