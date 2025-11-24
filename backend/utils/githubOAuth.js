import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { handleOAuthLogin } from "./handleOAuthLogin.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/github/callback`,
      passReqToCallback: true,
      scope: ["user:email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const roleFromRequest = req.query.state;
        const user = await handleOAuthLogin({
          provider: "github",
          profile,
          roleFromRequest,
        });
        return done(null, user);
      } catch (err) {
        console.error("GitHub strategy error:", err);
        return done(null, false, { message: err.message });
      }
    }
  )
);
