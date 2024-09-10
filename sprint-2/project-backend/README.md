# Project Backend

## Setup

Head to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new application.
- Make sure to add `http://localhost:4000/spotify/callback` as a redirect URI.
- Under "Which API/SDKs are you planning to use?" select `Web API`.

After creating the application, head to **Settings** and copy the `Client ID` and `Client Secret`.

In the [controllers](./controllers) directory create a file named `credentials.json` and add the following code:

```json
{
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret"
}
```

Replace the `your-client-id` and `your-client-secret` with your own credentials.
