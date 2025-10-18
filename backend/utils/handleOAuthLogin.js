import User from "../models/user.model.js";

/**
 * Handles OAuth login for a user, creating or linking accounts.
 * Returns { user, error } object instead of throwing.
 */
export const handleOAuthLogin = async ({ provider, profile, roleFromRequest }) => {
  try {
    const email = profile.emails?.[0]?.value?.toLowerCase();
    if (!email) {
      return { user: null, error: "Email not found from OAuth provider" };
    }

    if (!["student", "recruitor"].includes(roleFromRequest)) {
      return { user: null, error: "Invalid role" };
    }

    // 1️⃣ Try to find user by provider ID first
    let user = await User.findOne({
      "authProviders.provider": provider,
      "authProviders.providerId": profile.id,
    });

    // 2️⃣ If not found, try by email
    if (!user) {
      user = await User.findOne({ emailId: email });
    }

    // 3️⃣ Role validation for existing users
    if (user && roleFromRequest && user.role !== roleFromRequest) {
      return { user: null, error: `Account doesn't exist with role ${roleFromRequest}` };
    }

    // 4️⃣ If user doesn't exist, create new
    if (!user) {
      const nameSplit = profile.displayName ? profile.displayName.split(" ") : [];
      const firstName = nameSplit[0] || "";
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
        role: roleFromRequest, // assign role from request
      });
    } else {
      // 5️⃣ Link new provider if not already linked
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

    return { user, error: null };
  } catch (err) {
    console.error("OAuth login error:", err);
    return { user: null, error: "Internal server error" };
  }
};
