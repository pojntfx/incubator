import * as React from "react";
import Fetch from "react-fetch-component";
import { Paper } from "@libresat/frontend-components";
import { Image, Grid, Placeholder, Message } from "semantic-ui-react";
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
                    <Paper>
                      <b>Facebook: </b>
                      {event.payload.text}
                    </Paper>
                  ) : event.type.includes("com.github") ? (
                    <Paper>
                      <b>GitHub: </b>
                      {event.payload.text}
                    </Paper>
                  ) : event.type.includes("com.gitlab") ? (
                    <Paper>
                      <b>GitLab: </b>
                      {event.payload.title}
                    </Paper>
                  ) : event.type.includes("com.instagram") ? (
                    <Paper>
                      <b>Instagram: </b>
                      <br />
                      <Link to={event.payload.media}>
                        <Image fluid src={event.payload.media} />
                      </Link>
                      <p>{event.payload.text}</p>
                    </Paper>
                  ) : event.type.includes("com.reddit") ? (
                    <Paper>
                      <b>Reddit: </b>
                      {/(.mp4|.avi|.webm|.gifv)/.test(event.payload.media) ? (
                        <Link to={event.payload.media}>
                          <Video controls src={event.payload.media} />
                          <b>{event.payload.title}</b>
                        </Link>
                      ) : /(.jpg|.jpeg|.png|.gif|.webp)/.test(
                          event.payload.media
                        ) ? (
                        <Link to={event.payload.media}>
                          <Image fluid src={event.payload.media} />
                          <b>{event.payload.title}</b>
                        </Link>
                      ) : (
                        <Link to={event.payload.media}>
                          <b>{event.payload.title}</b>
                        </Link>
                      )}
                      <p>{event.payload.text}</p>
                    </Paper>
                  ) : (
                    <Paper>
                      <b>Twitter: </b>
                      {event.payload.text}
                    </Paper>
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
