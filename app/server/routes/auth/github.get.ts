export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name ?? user.login,
        email: user.email,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/login?error=oauth");
  },
});
