import CssBaseline from "@material-ui/core/CssBaseline";
import MainNavigation from "../components/global/MainNavigation";

export default ({ children }) => {
  return (
    <>
      <CssBaseline />
      <MainNavigation />
      {children}
    </>
  );
};
