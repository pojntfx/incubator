import { Requester } from "cote";

const requester = new Requester({
  name: "currency conversion requester"
});

const request = { type: "convert", from: "usd", to: "eur", amount: 200 };

requester.send(request, res => {
  console.log(res);
});
