import express from "express";
import { signup, login, logout, oauthCallback, getMe } from "../controllers/auth.controller.js";
import passport from "passport";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", userAuth, getMe);

router.get("/google", (req, res, next) => {
  const role = req.query.role; // ?role=student / recruiter
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: role,
    prompt: "select_account", // optional: always show chooser
  })(req, res, next);
});

// Callback – on failure, go back to frontend login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login/student?oauth=cancelled`,
  }),
  oauthCallback
);


router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
  }),
  oauthCallback
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
  })
);
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
  }),
  oauthCallback
);

router.post("/logout", logout);

export default router;
