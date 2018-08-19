// Imports
import { require as loadGTK, startLoop } from "node-gtk";
const { init, Window: GtkWindow, mainQuit, Label, main } = loadGTK(
  "Gtk",
  "3.0"
);

class App {
  constructor({ height, width }) {
    this.initializeNodeGtk();
    this.window = new GtkWindow();
    this.addDefaultEvents();
    this.setDefaultSize({ height, width });
    return {
      window: this,
      canvas: this.window
    };
  }

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

export { App, Label };
