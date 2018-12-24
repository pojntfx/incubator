# Social Media Feeds Gateway

Simple API for @pojntfx-incubator/social-media-feeds-core.

## Usage

The API provides endpoints for all functionality that @pojntfx-incubator/social-media-feeds-core, but in addition to that the following ones can be used:

```sh
# Get events for a user
USERID="2252754748345400"
USERNAME="pojntfx"
GITLAB_URL="gitlab.com"
AUTHORIZATION="asdf"
curl "http://localhost:3000/events/get?userId=${USERID}&userName=${USERNAME}&gitlabUrl=${GITLAB_URL}&authorization=${AUTHORIZATION}"
```

```sh
# Get stories for a user
USERNAME="pojntfx"
AUTHORIZATION="asdf"
curl "http://localhost:3000/stories/get?userName=${USERNAME}&authorization=${AUTHORIZATION}"
```

## Development and Setup

Put the follwing into a `.env` file (using your credentials):

```sh
# API Key (supply with ?authorization=asfdsadfasdfasdf)
SECRET_KEY="asfdsadfasdfasdf"

# GitLab
GITLAB_USERNAME="pojntfx"
GITLAB_URL="gitlab.com"

# GitLab
GITHUB_USERNAME="pojntfx"

# Reddit
REDDIT_USERNAME="pojntfx"

# Twitter
TWITTER_API_KEY="aopw34rwsdfj3294"
TWITTER_API_SECRET_KEY="3495sdifj829034"
TWITTER_USERNAME="pojntfx"

# Facebook
FACEBOOK_ACCESS_KEY="234i5jsdnfuh234"
FACEBOOK_USERID="2349d89393"

# Instagram
INSTAGRAM_SESSION_TOKEN="234oius89df873"
INSTAGRAM_USERNAME="pojntfx"
```

Then, run the following to develop:

```sh
npm run dev
```
