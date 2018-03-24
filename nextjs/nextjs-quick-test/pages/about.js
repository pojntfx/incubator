import withDefaultLayout from "../layouts/DefaultLayout";

const About = () => (
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nihil.
    Debitis id voluptatum ea. Natus excepturi itaque, voluptates voluptas
    repudiandae voluptate temporibus ullam repellendus optio eos vel nemo
    eveniet tempora minus saepe aliquam commodi, officiis ut ab. Ex ea
    voluptatibus alias veniam rem, eum nesciunt blanditiis pariatur odit quis
    facilis!
  </p>
);

export default withDefaultLayout({ title: "About us" })(About);
