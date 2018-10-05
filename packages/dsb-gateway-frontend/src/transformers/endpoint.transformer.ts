interface IGetEndpointParams {
  listEndpoint: string;
  dsbEndpoint: string;
  staticEndpoint: string;
  username: string;
  password: string;
}

const endpointTransformer = (
  listEndpoint: IGetEndpointParams["listEndpoint"],
  dsbEndpoint: IGetEndpointParams["dsbEndpoint"],
  staticEndpoint: IGetEndpointParams["staticEndpoint"],
  username: IGetEndpointParams["username"],
  password: IGetEndpointParams["password"]
) =>
  `${listEndpoint}?endpoint=${dsbEndpoint}&staticendpoint=${staticEndpoint}&username=${username}&password=${password}`;

export { endpointTransformer };
