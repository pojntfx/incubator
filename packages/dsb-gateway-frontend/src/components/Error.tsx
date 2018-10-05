import * as React from "react";
import { Alert } from "react-bootstrap";

interface IErrorProps {
  message: string;
  supportLink: string;
  supportPerson: string;
  error: Error;
}

const Error = ({ message, supportLink, supportPerson, error }: IErrorProps) => (
  <Alert variant="danger">
    <b>{message}</b> Report this to <a href={supportLink}>{supportPerson}</a> :
    <br /> {error.toString()}
  </Alert>
);

export { Error };
