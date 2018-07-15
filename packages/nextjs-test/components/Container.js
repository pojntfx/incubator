import { withStyles } from "@material-ui/core";

const styles = {
  container: {
    maxWidth: "1024px",
    width: "100%",
    padding: "15px",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

const Container = ({ children, classes, ...otherProps }) => (
  <div className={classes.container} {...otherProps}>
    {children}
  </div>
);

export default withStyles(styles)(Container);
