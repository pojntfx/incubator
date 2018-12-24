import * as React from "react";
import { Grid, Icon } from "semantic-ui-react";

interface IUserMetadata {
  location: string;
  date: string;
}

const UserMetadata = ({ location, date, ...otherProps }: IUserMetadata) => (
  <Grid columns="equal" stackable stretched {...otherProps}>
    <Grid.Column width={12}>
      <div>
        <Icon name="location arrow" />
        <b>Current location:</b> {location}
      </div>
    </Grid.Column>
    <Grid.Column textAlign="right" width={4}>
      <div>
        <Icon name="birthday" />
        <b>Birthday:</b> {new Date(date).toLocaleDateString()}
      </div>
    </Grid.Column>
  </Grid>
);

export { UserMetadata };
