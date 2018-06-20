import { Graphql } from "./graphql";

class Microservice {
  constructor({ graphql, mongodb, redis, s3 }) {
    this.configureMongodb(mongodb);
    this.configureRedis(redis);
    this.configureS3(s3);

    this.graphql = new Graphql(graphql);
  }

  configureMongodb = ({ url, userName, password, ...rest }) =>
    (this.mongodb = {
      url,
      userName,
      password,
      ...rest
    });

  configureRedis = ({ url, password, ...rest }) =>
    (this.redis = {
      url,
      password,
      ...rest
    });

  configureS3 = ({ url, token, ...rest }) =>
    (this.s3 = {
      url,
      token,
      ...rest
    });

  logDetails = () => {
    const output = `
    >>> 🚀  Microservice "${this.graphql.name}" is ready! <<<
    GraphQL Endpoint: ${this.graphql.url}
    MongoDB Endpoint: ${this.mongodb.url}
    Redis Endpoint:   ${this.redis.url}
    S3 Endpoint:      ${this.s3.url}
    `;
    console.log(output);
  };
}

export const createMicroservice = async config => {
  const microservice = new Microservice(config);
  await microservice.graphql.start();
  microservice.logDetails();
  return microservice;
};
