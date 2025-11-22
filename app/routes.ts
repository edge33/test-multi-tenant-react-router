import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("*", "routes/home.tsx", { id: "catch-all" }),
  ]),
] satisfies RouteConfig;
