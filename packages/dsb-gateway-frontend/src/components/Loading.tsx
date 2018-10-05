import * as React from "react";
import { Alert as AlertTemplate } from "react-bootstrap";
import styled from "styled-components";

interface IWarningProps {
  endpoint: string;
  lite?: boolean;
}

const Alert = styled(AlertTemplate)`
  overflow-x: auto;
  ${props => (props.theme.lite ? "border-radius: 0;" : null)};
`;

const Loading = ({ endpoint, lite }: IWarningProps) => (
  <Alert variant="info" className={lite ? "mb-0" : undefined} theme={{ lite }}>
    <b>Loading data ...</b> <br />
    {lite ? null : (
      <>
        DSB Gateway API Endpoint: <a href={endpoint}>{endpoint}</a>
      </>
    )}
  </Alert>
);

export { Loading };
