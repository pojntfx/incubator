/**
 * Add a timestamp to the object
 * @param {name} name Name of the timestamp
 */
export const setTimestamp = name => async context => {
  context.data[name] = new Date();
  return context;
};
