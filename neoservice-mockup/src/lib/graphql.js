import { ApolloServer } from "apollo-server";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";

export class Graphql {
  name;
  port;
  url;
  server;

  constructor({ name, port }) {
    this.name = name;
    this.port = port;
  }

  start = async () => {
    // Load typeDefs and resolvers from path
    const config = {
      typeDefs: mergeTypes(fileLoader(path.join(__dirname, "../typeDefs"))),
      resolvers: mergeResolvers(
        fileLoader(path.join(__dirname, "../resolvers"))
      )
    };

    // Log events to console
    const logFunction = information => console.log(information);

    // Create server with typeDefs and resolvers
    const server = new ApolloServer({
      ...config,
      logFunction
    });

    // Listen and log
    const { url } = await server.listen(this.port);
    this.url = url;
    this.server = server;
  };
}
