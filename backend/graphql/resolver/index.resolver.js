import authResolver from "./auth.resolver.js";
import listResolver from "./list.resolver.js";
import taskResolver from "./task.resolver.js";

const rootResolver = {
  ...authResolver,
  ...listResolver,
  ...taskResolver,
};

export default rootResolver;
