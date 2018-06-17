import { BadRequest } from "@feathersjs/errors";

export const validateMessage = async context => {
  const { data } = context;

  if (!data.text) {
    throw new BadRequest("Message text must exist");
  }

  if (typeof data.text !== "string" || data.text.trim() === "") {
    throw new BadRequest("Message's text should be text");
  }

  context.data = {
    data: data.text.toString()
  };

  return context;
};
