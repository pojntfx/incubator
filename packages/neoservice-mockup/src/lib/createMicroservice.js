import { createGraphql } from "./createGraphql";
import { createMongodb } from "./createMongodb";

/**
 * Create a new microservice
 * @param config Configuration object containing meta and connection details`
 */
export const createMicroservice = async config => {
  // Create servers
  const graphql = await createGraphql(config.graphql);
  const mongodb = await createMongodb(config.mongodb);
  // const redis = await createRedis(config.redis);
  // const s3 = await createS3(config.s3);
  // Log details
  console.log(`
  >>> 🚀  Microservice "${config.name}" is ready! <<<
  GraphQL Endpoint: ${graphql.url}
  MongoDB Endpoint: mongodb://${config.mongodb.host}:${config.mongodb.port}
  `);
  // Redis Endpoint:   ${redis.url}
  // S3 Endpoint:      ${s3.url}
  // Make servers available
  return {
    name: config.name,
    graphql,
    mongodb
    // redis,
    // s3
  };
};
