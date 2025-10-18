import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleOAuthLogin } from "./handleOAuthLogin.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
       try {
        const roleFromRequest = req.query.state; // here we read the role
        const user = await handleOAuthLogin({
          provider: "google",
          profile,
          roleFromRequest,
        })
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);