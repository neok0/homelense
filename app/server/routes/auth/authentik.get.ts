export default defineOAuthAuthentikEventHandler({
  config: {},
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        name: user.name ?? user.preferred_username ?? user.email,
        username: user.preferred_username,
        email: user.email,
        roles: user.roles,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Authentik OAuth error:", error);
    return sendRedirect(event, "/login?error=oauth");
  },
});
