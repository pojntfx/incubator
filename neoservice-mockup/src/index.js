import { createMicroservice } from "./lib/createMicroservice";

createMicroservice({
  name: "Example Microservice",
  graphql: {
    port: 3000
  },
  mongodb: {
    host: "127.0.0.1",
    port: "27017"
    // userName: "max",
    // password: "1234asdf"
  }
  // redis: {
  //   url: "redis://127.0.0.1:6379",
  //   password: "1234asdf2"
  // },
  // s3: {
  //   url: "s3://127.0.0.1:1234",
  //   token: "asdfiowjer8435jhowjrt345"
  // }
});
