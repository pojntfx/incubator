import { Responder } from "cote";

interface IDeck {
  id?: number;
  title: string;
  text: string;
  license: string;
  cards: ICard[];
}

let decks: IDeck[] = [];

interface ICard {
  id?: number;
  de: string;
  pinyin: string;
  hanzi: string;
}
let cards: ICard[] = [];

const responder = new Responder({
  namespace: "entity",
  name: "entity responder"
});

responder.on("createDeck", (req: any, cb: any) => {
  // Create the deck
  const deckToPush = {
    id: decks.length,
    title: req.title,
    text: req.text,
    license: req.license,
    cards: []
  };
  // Add the deck to the db
  decks.push(deckToPush);
  // Return the deck
  cb(deckToPush);
});

responder.on("createCard", (req: any, cb: any) => {
  const cardToPush = {
    id: cards.length,
    de: req.de,
    pinyin: req.pinyin,
    hanzi: req.hanzi
  };
  cards.push(cardToPush);
  cb(cardToPush);
});

responder.on("assignCardToDeck", (req: any, cb: any) => {
  const deckToAssignCardTo = decks.find(deck => deck.id === req.deckId);
  deckToAssignCardTo.cards.push(({
    id: Number(req.cardId)
  } as unknown) as ICard);
  cb(deckToAssignCardTo);
});
