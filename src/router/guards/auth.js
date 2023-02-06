// import { use_auth_store } from "@/stores/auth"
// import { use_user_store } from "@/stores/user"

export const auth_guard = async (to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);
  // const auth_store = use_auth_store()
  // const user_store = use_user_store()

  const public_routes = ["login"];

  // && !user_store.user?.id
  const is_authenticated = true;
  if (!public_routes.includes(to.name.toLowerCase()) && !is_authenticated) {
    // auth_store.clear_auth();
    next("/login");
    return;
  } else next();

  // If everything is good, continue to the route
  next();
};

export default auth_guard;
