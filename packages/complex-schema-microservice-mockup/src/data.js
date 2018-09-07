const ri = () => Math.floor(Math.random() * 1000);

const rs = () =>
  Math.random()
    .toString(36)
    .substring(7);

const av = "1";

module.exports = {
  organisations: [
    {
      id: 1,
      apiVersion: av,
      kind: "Organisation"
    }
  ],
  roles: [
    {
      id: 1,
      apiVersion: av,
      kind: "Roles",
      organisation_id: 1
    }
  ],
  users: [
    {
      id: 1,
      apiVersion: av,
      kind: "Users",
      role_id: 1
    }
  ],
  clouds: [
    {
      id: 1,
      apiVersion: av,
      kind: "Clouds",
      organisation_id: 1
    }
  ],
  clusters: [
    {
      id: 1,
      apiVersion: av,
      kind: "Clusters",
      cloud_id: 1
    }
  ],
  hosts: [
    {
      id: 1,
      apiVersion: av,
      kind: "Hosts",
      cluster_id: 1
    }
  ]
};
