import { Responder } from "cote";

const responder = new Responder({ name: "currency conversion responder" });

const rates = { usd_eur: 0.91, eur_usd: 1.1 };

responder.on("convert", (req: any, cb: any) => {
  cb(req.amount * rates[`${req.from}_${req.to}`]);
});
