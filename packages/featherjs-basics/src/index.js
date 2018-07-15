import { MessagesMicroservice } from "./start";

const port = 3000;

const messagesMicroservice = new MessagesMicroservice({
  port
});

messagesMicroservice.start();
