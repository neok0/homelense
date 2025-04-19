export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const { loggedIn } = useUserSession();
  if (config.public.use_oauth && !loggedIn.value) {
    return navigateTo("/login");
  }
});
