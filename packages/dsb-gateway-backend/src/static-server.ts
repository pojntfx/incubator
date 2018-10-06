import * as handler from "serve-handler";
import { send } from "micro";
import { router, get } from "micro-fork";

const info = (_, res) => send(res, 200, "Everything is working fine!");

export default router()(
  get("/", info),
  get("/img/*", handler, {
    public: "static/"
  })
);

export { info };
