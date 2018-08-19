/**
 * This is non-functional mockup that describes how I'd design a React-like library using node-gtk.
 */

import { App, Component } from "@simple-gtk/core";

import {
  View,
  HeaderBar,
  Container,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  Split,
  Button,
  Label,
  Icon
} from "@simple-gtk/components";

import { CENTER, SPACE_BETWEEN } from "@simple-gtk/constants/positions";
import { MEDIUM } from "@simple-gtk/constants/widths";
import { VERTICAL } from "@simple-gtk/constants/orientations";

import { c } from "@simple-gtk/utils";

import { Route } from "@simple-gtk/router";

import { Notes, Note, About, Help } from "./routes";

class Settings extends Component {
  state = {
    notes: [
      {
        title: "first note",
        slug: "1",
        id: 1
      },
      {
        title: "second note",
        slug: "2",
        id: 2
      }
    ]
  };

  /**
   * Adds a new note. Not implemented yet.
   */
  createNewNote = () => console.log("Creating new note ...");

  /**
   * Deletes a note by it's id.
   */
  deleteNote = idToDelete =>
    this.state.notes.filter(({ id }) => id === idToDelete);

  render() {
    return c(
      new View({
        title: "Notes Manager",
        width: 1280,
        height: 768,
        position: CENTER,
        headerBar: c(
          new HeaderBar({
            left: c(
              new Button({
                label: "New Note",
                onClick: this.createNewNote()
              })
            ),
            center: c(
              new Tabs([
                c(new Tab({ label: "Notes", to: "/notes" })),
                c(new Tab({ label: "Settings", to: "/settings" }))
              ])
            ),
            right: [
              c(
                new Button({
                  icon: new Icon({ name: "hamburger" })
                }),
                c(new List(), [
                  new ListItem({
                    name: "About",
                    to: "/about"
                  }),
                  new ListItem({
                    name: "Help",
                    to: "/help"
                  })
                ])
              )
            ]
          })
        )
      }),
      c(
        new Container({
          maxWidth: MEDIUM,
          contentJustification: CENTER
        }),
        c(
          new Box({ orientation: VERTICAL }),
          c(
            new List({
              title: "Notes",
              orientation: VERTICAL
            }),
            this.state.map(({ title, slug, id }) =>
              c(
                new ListItem({
                  title,
                  to: `/notes/${slug}`
                }),
                c(
                  new Split({
                    contentJustification: SPACE_BETWEEN
                  }),
                  [
                    new Label({
                      title: slug
                    }),
                    new Button({
                      icon: new Icon({ name: "delete" }),
                      onClick: this.deleteNote(id)
                    })
                  ]
                )
              )
            )
          )
        )
      )
    );
  }
}

const routes = [
  new Route({
    component: () => new Notes(),
    path: "/notes"
  }),
  new Route({
    component: ({ params: { id } }) => new Note({ props: { id } }),
    path: "/notes/:id"
  }),
  new Route({
    component: () => new Settings(),
    path: "/settings"
  }),
  new Route({
    component: () => new Help(),
    path: "/help"
  }),
  new Route({
    component: () => new About(),
    path: "/about"
  })
];

const app = new App({
  title: "Notes",
  routes
});

app.start();
