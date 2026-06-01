const BASE_URL = "http://localhost:1337";

export const normalizeUser = (user, profile = null) => {

  let avatar = null;

  // ======================
  // PROFILE AVATAR
  // ======================
  if (profile?.avatar?.url) {

    avatar = profile.avatar.url.startsWith("http")
      ? profile.avatar.url
      : `${BASE_URL}${profile.avatar.url}`;
  }

  // ======================
  // RETURN UNIFIED USER
  // ======================
  return {
    id: user.id,
    documentId: user.documentId,

    username: user.username,
    email: user.email,

    provider: user.provider,
    confirmed: user.confirmed,
    blocked: user.blocked,
accountType: user.accountType,
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",

    phone: profile?.phone || "",
    address: profile?.address || "",

    avatar,
  };
};