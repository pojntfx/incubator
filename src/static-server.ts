import * as handler from "serve-handler";
import { router, get } from "micro-fork";

export default router()(
  get("/img/*", handler, {
    public: "static/"
  })
);
