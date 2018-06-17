/**
 * Message service
 */
export class Messages {
  messages = [];
  currentId = 0;

  /**
   * Return the list of all messages
   * @param {parameters} parameters Search parameters
   */
  async find(parameters) {
    return this.messages;
  }

  /**
   * Get a message by id
   * @param {id} id Unique identifier of the message
   * @param {parameters} parameters Search parameters
   */
  async get(id, parameters) {
    const message = this.messages.find(
      message => message.id === parseInt(id, 10)
    );
    if (!message) {
      throw new Error(`Message with id ${id} not found`);
    } else {
      return message;
    }
  }

  /**
   * Create a message with data
   * @param {data} data Data in the message
   * @param {parameters} parameters Parameters for creation
   */
  async create(data, parameters) {
    // Create a message with a unique ID
    const message = Object.assign({ id: ++this.currentId }, data);
    // Save the message
    this.messages.push(message);
    return message;
  }

  /**
   * Update a message
   * @param {id} id Id of the message that should be updated
   * @param {data} data Data for the new message
   * @param {parameters} parameters Parameters for the update
   */
  async patch(id, data, parameters) {
    //   Get the old message
    const message = await this.get(id);
    // Update the old message with the new data
    return Object.assign(message, data);
  }

  /**
   * Delete a message
   * @param {id} id Id of the message that should be removed
   * @param {parameters} parameters Parameters for the deletion
   */
  async remove(id, parameters) {
    // Get the message that should be removed
    const message = await this.get(id);
    const index = this.messages.indexOf(message);
    // Remove the message and return it
    this.messages[index].delete();
    return message;
  }
}
