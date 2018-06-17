import { setTimestamp } from "../utils/setTimestamp";
import { validateMessage } from "../validation/message.validation";

/**
 * Message service's hooks
 */
export const messagesHooks = {
  before: {
    /**
     * Add createdAt timestamp to new Messages
     */
    create: [validateMessage, setTimestamp("createdAt")], //(setTimestamp("createdAt")),
    /**
     * Add updatedAt timestamp to updated Messages
     */
    update: [validateMessage, setTimestamp("updatedAt")] //(setTimestamp("updatedAt"))
  }
};
