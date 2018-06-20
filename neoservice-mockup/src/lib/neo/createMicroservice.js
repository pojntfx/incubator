import { createGraphql } from "./createGraphql";

/**
 * Create a new microservice
 * @param config Configuration object containing meta and connection details`
 */
export const createMicroservice = async config => {
  // Create servers
  const graphql = await createGraphql(config.graphql);
  // const mongodb = await createMongodb(config.mongodb);
  // const redis = await createRedis(config.redis);
  // const s3 = await createS3(config.s3);
  // Log details
  console.log(`
  >>> 🚀  Microservice "${config.name}" is ready! <<<
  GraphQL Endpoint: ${graphql.url}
  `);
  // MongoDB Endpoint: ${mongodb.url}
  // Redis Endpoint:   ${redis.url}
  // S3 Endpoint:      ${s3.url}
  // Make servers available
  return {
    name: config.name,
    graphql
    // mongodb,
    // redis,
    // s3
  };
};

// Test the microservice
createMicroservice({
  name: "Example Microservice",
  graphql: {
    port: 3000
  }
  // mongodb: {
  //   url: "mongodb://127.0.0.1:27017",
  //   userName: "max",
  //   password: "1234asdf"
  // },
  // redis: {
  //   url: "redis://127.0.0.1:6379",
  //   password: "1234asdf2"
  // },
  // s3: {
  //   url: "s3://127.0.0.1:1234",
  //   token: "asdfiowjer8435jhowjrt345"
  // }
});
