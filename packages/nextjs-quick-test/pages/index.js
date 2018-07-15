import withDefaultLayout from "../layouts/DefaultLayout";

const Index = props => <p>Hello, world!</p>;

export default withDefaultLayout({ title: "Home" })(Index);
