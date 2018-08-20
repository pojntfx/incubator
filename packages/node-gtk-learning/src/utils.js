// Imports
import { require as loadGTK, startLoop } from "node-gtk";
const {
  init,
  Window: GtkWindow,
  mainQuit,
  Label,
  HeaderBar,
  Button,
  Grid,
  main,
  Box,
  WindowPosition: { NONE, CENTER, MOUSE, CENTER_ON_PARENT },
  Orientation
} = loadGTK("Gtk", "3.0");

class View {
  constructor({ title, height, width, position }) {
    this.initializeNodeGtk();
    this.window = new GtkWindow();
    this.addDefaultEvents();
    this.setDefaultSize({ height, width });
    this.setTitle(title);
    this.setPosition(position);
    return {
      view: this,
      window: this.window
    };
  }

  setTitle = title => (this.window.title = title);

  setPosition = position => {
    const getPosition = position => {
      switch (position) {
        case "none":
          return NONE;
        case "center":
          return CENTER;
        case "mouse":
          return MOUSE;
        case "centerOnParent":
          return CENTER_ON_PARENT;
      }
    };

    this.window.windowPosition = getPosition(position);
  };
  initializeNodeGtk = () => {
    startLoop();
    init();
  };

  addDefaultEvents = () => {
    this.window.on("destroy", () => mainQuit());
    this.window.on("delete-event", () => false);
  };

  setDefaultSize = ({ height, width }) =>
    this.window.setDefaultSize(width, height);

  show = () => {
    this.window.showAll();
    main();
  };
}

const getComponent = (version = "3") => loadGTK("Gtk", version);

export { View, Grid, Label, HeaderBar, Button, Box, Orientation, getComponent };
