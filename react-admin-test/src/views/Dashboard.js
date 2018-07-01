import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ViewTitle } from "react-admin";

export default props => (
  <Card {...props}>
    <ViewTitle title="Welcome to FSDB2" />
    <CardContent>
      <Typography component="p">
        The libre solution for internal communication
      </Typography>
    </CardContent>
  </Card>
);
