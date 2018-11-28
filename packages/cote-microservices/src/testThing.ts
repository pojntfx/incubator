const cote = require('cote');

const requester = new cote.Requester({ name: 'currency conversion requester' });

const req = {
  type: "createDeck",
  title: "First Deck",
  text: "This is the first deck",
  license: "CC-BY-SA-4.0"
};

requester.send(req, (res) => {
    console.log(res);
});