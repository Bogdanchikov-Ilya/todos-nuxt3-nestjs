export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    // check if value exists
  }

  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});