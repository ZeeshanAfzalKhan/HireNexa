import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { handleOAuthLogin } from "./handleOAuthLogin.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleOAuthLogin({ provider: "github", profile });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
