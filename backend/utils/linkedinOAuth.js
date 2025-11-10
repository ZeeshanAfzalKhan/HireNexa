import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { handleOAuthLogin } from "./handleOAuthLogin.js";

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/linkedin/callback`,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleOAuthLogin({ provider: "linkedin", profile });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
