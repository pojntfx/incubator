import { ServiceBroker } from "moleculer";
import Gateway from "moleculer-web";
import dotenv from "dotenv";
import { Config } from "./config";
import { Facebook } from "./facebook";
import { Events } from "./events";
import { GitHub } from "./github";
import { GitLab } from "./gitlab";
import { Instagram } from "./instagram";
import { Reddit } from "./reddit";
import { Twitter } from "./twitter";
import { Stories } from "./stories";

dotenv.config();

const broker = new ServiceBroker({
  transporter: "TCP",
  cacher: "Memory"
});

broker.createService(Config);
broker.createService(Facebook);
broker.createService(GitHub);
broker.createService(GitLab);
broker.createService(Instagram);
broker.createService(Reddit);
broker.createService(Twitter);

broker.createService(Events);
broker.createService(Stories);

broker.createService(Gateway);
broker.start();
