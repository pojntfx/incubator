import * as React from "react";
import Fetch from "react-fetch-component";
import { Paper } from "@libresat/frontend-components";
import { Image, Grid, Placeholder, Message, Card } from "semantic-ui-react";
import { Link } from "./Link";
import Lazy from "react-lazyload";
import { Video } from "./Video";

interface IActivityFeed {
  userId: string;
  userName: string;
  gitlabUrl: string;
  authorization: string;
  endpoint: string;
}

const ActivityFeed = ({
  userId,
  userName,
  gitlabUrl,
  authorization,
  endpoint,
  ...otherProps
}: IActivityFeed) => (
  <Grid columns={2} stackable stretched>
    <Fetch
      url={`${endpoint}/events/get?userId=${userId}&authorization=${authorization}&userName=${userName}&gitlabUrl=${gitlabUrl}`}
      {...otherProps}
    >
      {({ data, loading, error }) => (
        <>
          {error && (
            <Message
              icon="warning"
              error
              header="Oh no!"
              content="Could not fetch activity."
            />
          )}
          {loading && (
            <>
              <Grid.Column>
                <Paper>
                  <Placeholder>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Paper>
              </Grid.Column>
              <Grid.Column>
                <Paper>
                  <Placeholder>
                    <Placeholder.Image />
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Paper>
              </Grid.Column>
            </>
          )}
          {Array.isArray(data) &&
            data.map((event, index) => (
              <Lazy key={index} height={500} once>
                <Grid.Column>
                  {event.type === "com.facebook.Post" ? (
                    <Card
                      meta={`Facebook, ${new Date(
                        event.time
                      ).toLocaleString()}`}
                      description={event.payload.text}
                      fluid
                    />
                  ) : event.type.includes("com.github") ? (
                    <Card
                      meta={`GitHub, ${new Date(event.time).toLocaleString()}`}
                      header={event.payload.text}
                      fluid
                    />
                  ) : event.type.includes("com.gitlab") ? (
                    <Card
                      meta={`GitLab, ${new Date(event.time).toLocaleString()}`}
                      header={event.payload.title}
                      fluid
                    />
                  ) : event.type.includes("com.instagram") ? (
                    <Card
                      meta={`Instagram, ${new Date(
                        event.time
                      ).toLocaleString()}`}
                      description={event.payload.text}
                      image={
                        <Link to={event.payload.media}>
                          <Image fluid src={event.payload.media} />
                        </Link>
                      }
                      fluid
                    />
                  ) : event.type.includes("com.reddit") ? (
                    <Card
                      meta={`Reddit, ${new Date(event.time).toLocaleString()}`}
                      header={event.payload.title}
                      description={event.payload.text}
                      image={
                        /(.mp4|.avi|.webm|.gifv)/.test(event.payload.media) ? (
                          <Link to={event.payload.media}>
                            <Video controls src={event.payload.media} />
                          </Link>
                        ) : /(.jpg|.jpeg|.png|.gif|.webp)/.test(
                            event.payload.media
                          ) ? (
                          <Link to={event.payload.media}>
                            <Image fluid src={event.payload.media} />
                          </Link>
                        ) : (
                          undefined
                        )
                      }
                      fluid
                    />
                  ) : (
                    <Card
                      meta={`Twitter, ${new Date(event.time).toLocaleString()}`}
                      header={event.payload.text}
                      fluid
                    />
                  )}
                </Grid.Column>
              </Lazy>
            ))}
        </>
      )}
    </Fetch>
  </Grid>
);

export { ActivityFeed };
