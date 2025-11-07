import express from "express";
import { signup, login, logout, oauthCallback } from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get(
  "/google",
  (req, res, next) => {
    const role = req.query.role; // frontend sends ?role=student
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: role, // ✅ attach role here
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failure" }),
  oauthCallback
);
router.get("/auth/google/failure", (req, res) => {
  res.status(401).json({ success: false, message: "OAuth failed" });
});

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
