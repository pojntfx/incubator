import * as React from "react";
import { Alert } from "react-bootstrap";

interface IWarningProps {
  endpoint: string;
}

const Warning = ({ endpoint }: IWarningProps) => (
  <Alert variant="info">
    <b>Loading data ...</b> <br />
    DSB Gateway API Endpoint: <a href={endpoint}>{endpoint}</a>
  </Alert>
);

export { Warning };
