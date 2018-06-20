import { createMicroservice } from "./lib/createMicroservice";

const { graphql } = createMicroservice({
  graphql: {
    name: "Example Microservice",
    port: 3000
  },
  mongodb: {
    url: "mongodb://127.0.0.1:27017",
    userName: "max",
    password: "1234asdf"
  },
  redis: {
    url: "redis://127.0.0.1:6379",
    password: "1234asdf2"
  },
  s3: {
    url: "s3://127.0.0.1:1234",
    token: "asdfiowjer8435jhowjrt345"
  }
});

console.log(graphql.url);
