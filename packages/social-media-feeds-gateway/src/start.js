import { ServiceBroker } from "moleculer";
import Gateway from "moleculer-web";
import dotenv from "dotenv";
import { Config } from "./config";
import { Facebook } from "./facebook";
import { Events } from "./events";
import { GitHub } from "./github";
import { GitLab } from "./gitlab";

dotenv.config();

const broker = new ServiceBroker({
  transporter: "TCP"
});

broker.createService(Config);
broker.createService(Facebook);
broker.createService(GitHub);
broker.createService(GitLab);

broker.createService(Events);

broker.createService(Gateway);
broker.start();
