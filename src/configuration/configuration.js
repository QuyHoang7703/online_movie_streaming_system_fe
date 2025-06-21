export const OAuthConfig = {
  clientId:
    "579536374000-2jigrlttod4v2m34f5pvejmiopbfdvin.apps.googleusercontent.com",
  redirectUri:
    import.meta.env.VITE_OAUTH_REDIRECT_URI ||
    "http://localhost:5173/oauth2/callback",
  authUri: "https://accounts.google.com/o/oauth2/auth",
};
