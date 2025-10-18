import User from "../models/user.model.js";

export const handleOAuthLogin = async ({ provider, profile }) => {
  let user = await User.findOne({
    "authProviders.provider": provider,
    "authProviders.providerId": profile.id,
  });

const email = profile.emails?.[0]?.value?.toLowerCase();

  if (!user && email) {
    // Try to find existing user by email
    user = await User.findOne({ emailId: email });
  }

  if (!user) {
    const nameSplit = profile.displayName ? profile.displayName.split(" ") : [];
    const firstName = nameSplit[0] || "";
    const lastName = nameSplit[1] || "";

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
      role: "student",
    });
  } else {
    // Link new provider if not already linked
    const alreadyLinked = user.authProviders.some(
      (p) => p.provider === provider
    );

    if (!alreadyLinked) {
      user.authProviders.push({
        provider,
        providerId: profile.id,
        profilePictureURL: profile.photos?.[0]?.value || "",
      });
      await user.save();
    }
  }

  return user;
};
