import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  // This is extremely basic and is in no way secure but it'll do
  // did this in line 30s dont judge me joshua
  if (
    context.url.pathname === "/password" &&
    context.cookies.get("password")?.value === import.meta.env.PASSWORD
  )
    return context.redirect("/");

  if (
    context.url.pathname !== "/password" &&
    context.cookies.get("password")?.value !== import.meta.env.PASSWORD
  ) {
    return context.redirect("/password");
  }
  return next();
});
