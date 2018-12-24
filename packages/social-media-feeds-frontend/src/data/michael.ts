import { common } from "./common";
import pb from "../assets/pb-michael.jpg";

const michael = {
  head: {
    title: "Michael",
    description: "Information on Michael Pojtinger.",
    author: common.author,
    keywords: ["michael", "pojtinger", "father"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color,
    lang: common.language
  },
  background: common.background,
  header: {
    img: pb,
    name: "Michael Pojtinger",
    handle: "michael.pojtinger",
    text: ``,
    mail: "michael@pojtinger.com",
    follow: "https://www.instagram.com/michaelpojtinger/"
  },
  metadata: {
    location: "Baiersbronn, Baden-Württemberg, Germany, European Union",
    date: "1972-04-03"
  },
  links: [
    {
      title: "Instagram",
      img:
        "https://img.shields.io/badge/Instagram-%40michaelpojtinger-E4405F.svg?logo=instagram&style=social",
      link: "https://www.instagram.com/michaelpojtinger/",
      help: {
        title: "Instagram",
        text: "Quick and simple, multimedia-driven posts and stories.",
        docsLink: "https://www.instagram.com"
      }
    },
    {
      title: "Facebook",
      img:
        "https://img.shields.io/badge/Facebook-%40michael%2epojtinger-3b5998.svg?logo=facebook&style=social",
      link: "https://www.facebook.com/michael.pojtinger",
      help: {
        title: "Facebook",
        text: "The traditional social network.",
        docsLink: "https://www.facebook.com"
      }
    }
  ]
};

export { michael };
