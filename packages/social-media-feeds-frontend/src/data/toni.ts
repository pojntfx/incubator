import { common } from "./common";
import pb from "../assets/pb-toni.jpg";

const toni = {
  head: {
    title: "Toni",
    description: "Information on Toni Pojtinger.",
    author: common.author,
    keywords: ["toni", "pojtinger", "survival"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color,
    lang: common.language
  },
  background: common.background,
  header: {
    img: pb,
    name: "Toni Pojtinger",
    handle: "toni.pojtinger",
    text: `Toni Pojtinger
PB: 77m🤙🏻🤜🏻🤛🏻
13 yrs
Bro🔥🔥🔥:@gubi_05
Ski Jumping, Freeskiing`,
    mail: "toni@pojtinger.com",
    follow: "https://www.instagram.com/toni.pojtinger/"
  },
  metadata: {
    location: "Baiersbronn, Baden-Württemberg, Germany, European Union",
    date: "2005-08-24"
  },
  links: [
    {
      title: "Instagram",
      img:
        "https://img.shields.io/badge/Instagram-%40toni%2epojtinger-E4405F.svg?logo=instagram&style=social",
      link: "https://www.instagram.com/toni.pojtinger/",
      help: {
        title: "Instagram",
        text: "Quick and simple, multimedia-driven posts and stories.",
        docsLink: "https://www.instagram.com"
      }
    }
  ]
};

export { toni };
