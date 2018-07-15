import MainNavigation from "../components/MainNavigation";
import Container from "../components/Container";

export default ({ children, ...props }) => (
  <>
    <MainNavigation />
    <Container>{children}</Container>
  </>
);
