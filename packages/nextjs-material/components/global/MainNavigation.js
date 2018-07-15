import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Settings from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

const MainNavigation = ({ classes }) => (
  <>
    <AppBar position="static" color="primary" className={classes.root}>
      <Toolbar>
        <Typography variant="title" color="inherit">
          Title
        </Typography>
      </Toolbar>
      <Button color="inherit">
        <Settings />
        Settings
      </Button>
    </AppBar>
  </>
);

export default withStyles(styles)(MainNavigation);
