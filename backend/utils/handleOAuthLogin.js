import User from "../models/user.model.js";

/**
 * Handles OAuth login for a user, creating or linking accounts.
 * Returns { user, error } object instead of throwing.
 */
export const handleOAuthLogin = async ({ provider, profile, roleFromRequest }) => {
  try {

    const email = (profile.emails?.[0]?.value || profile._json?.email)?.toLowerCase();
    if (!email) {
      throw new Error("Email not found from OAuth provider");
    }

    if (!["student", "recruitor"].includes(roleFromRequest)) {
      throw new Error("Invalid role");
    }

    let user = await User.findOne({
      "authProviders.provider": provider,
      "authProviders.providerId": profile.id,
    });

    if (!user) {
      user = await User.findOne({ emailId: email });
    }

    if (user && roleFromRequest && user.role !== roleFromRequest) {
      throw new Error(`Account doesn't exist with role ${roleFromRequest}`);
    }

    if (!user) {
      const displayName = profile.displayName || profile.username || profile._json?.name || "User";
      const nameSplit = displayName.split(" ");
      const firstName = nameSplit[0] || "User";
      const lastName = nameSplit.slice(1).join(" ") || "";

      user = await User.create({
        firstName,
        lastName,
        emailId: email,
        isOAuthUser: true,
        authProviders: [
          {
            provider,
            providerId: profile.id,
            profilePictureURL: profile.photos?.[0]?.value || "",
          },
        ],
        role: roleFromRequest,
      });
    } else {
      const alreadyLinked = user.authProviders.some((p) => p.provider === provider);
      if (!alreadyLinked) {
        user.authProviders.push({
          provider,
          providerId: profile.id,
          profilePictureURL: profile.photos?.[0]?.value || "",
        });
        await user.save();
      }
    }

    return { user };
  } catch (err) {
    console.error("OAuth login error:", err);
    throw err;
  }
};
