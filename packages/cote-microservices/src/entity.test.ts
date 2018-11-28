import { Requester } from "cote";

const requester = new Requester({
  namespace: "entity",
  name: "entity test requester"
});

it("Should return the sent deck", () => {
  const req = {
    type: "createDeck",
    title: "First Deck",
    text: "This is the first deck",
    license: "CC-BY-SA-4.0"
  };
  requester.send(req, res => expect(res.title).toBe(req.title));
});

it("Should return the sent card", () => {
  const req = {
    type: "createCard",
    de: "Hallo",
    pinyin: "ni3 ha3o",
    hanzi: "你好"
  };
  requester.send(req, res => expect(res.de).toBe(req.de));
});

it("Should assign the sent card to the sent deck", () => {
  const deckReq = {
    type: "createDeck",
    title: "First Deck",
    text: "This is the first deck",
    license: "CC-BY-SA-4.0"
  };
  const cardReq = {
    type: "createCard",
    de: "Hallo",
    pinyin: "ni3 ha3o",
    hanzi: "你好"
  };
  const assignCardToDeckReq = {
    type: "assignCardToDeck",
    deckId: "1",
    cardId: "1"
  };
  requester.send(deckReq);
  requester.send(cardReq);
  requester.send(assignCardToDeckReq, res =>
    expect(res.cards.find(card => card.id === 1).id).toBe(1)
  );
});
