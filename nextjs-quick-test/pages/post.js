import withDefaultLayout from "../layouts/DefaultLayout";

const Post = ({ url: { query: { title } } }) => (
  <article>
    <h1>{title}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum ducimus
      sit qui reiciendis sapiente! Impedit quo veritatis voluptate culpa?
      Expedita repellendus cupiditate amet dolores porro ea eveniet officia,
      perspiciatis, nesciunt, voluptatibus quod adipisci accusamus? Aspernatur
      quam necessitatibus autem corporis in quod voluptatibus consequatur quas
      nisi, possimus praesentium rem iste incidunt?
    </p>
  </article>
);

export default withDefaultLayout({ title: "Blog" })(Post);
