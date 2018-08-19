import { App } from "./utils";
import { Grid, Label, Button, HeaderBar } from "./components";

// Initialize the window
const { app, window } = new App({
  title: "Note Manager",
  width: 1024,
  height: 600,
  position: "center"
});

// Create a layout
const grid = new Grid();

// Create and configure some components
const headerBar = new HeaderBar({ title: window.title });
headerBar.setShowCloseButton(true);

const createNewNoteButton = new Button();
createNewNoteButton.add(new Label({ label: "Create New Note" }));

// Add the components to the layout
headerBar.add(createNewNoteButton);

// Add the components to the window and app
window.add(grid);
window.setTitlebar(headerBar);

// Display the app
app.show();
