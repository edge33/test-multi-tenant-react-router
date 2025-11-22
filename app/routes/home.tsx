import { Route as ReactRouterRoute, replace, Routes } from "react-router";
import SubdomainDashboard from "~/pages/SubdomainDashboard";
import SubdomainHome from "~/pages/SubdomainHome";
import { getSubdomain } from "~/utils/getSubdomain";
import { isSubdomainAllowed, isValidSubdomain } from "~/utils/subdomainConfig";
import type { Route } from "./+types/home";

export async function loader({ request, params }: Route.LoaderArgs) {
  const host = request.headers.get("host");
  const subdomain = getSubdomain(request.url);
  const url = new URL(request.url);

  // Validate subdomain if present
  if (subdomain) {
    if (!isValidSubdomain(subdomain) || !isSubdomainAllowed(subdomain)) {
      // You could redirect to an error page or return an error response
      // For now, we'll treat invalid subdomains as if they don't exist
      return { subdomain: null, host, error: "Invalid subdomain" };
    }
  }

  // If we have a subdomain and we're on the root path, redirect to subdomain home
  // if (subdomain && url.pathname === "/") {
  //   return subdomain;
  // }

  // If we don't have a subdomain and we're on a subdomain route, redirect to root
  if (
    !subdomain &&
    (url.pathname.startsWith("/subdomain-home") ||
      url.pathname.startsWith("/dashboard"))
  ) {
    return replace("/");
  }

  return { subdomain, path: url.pathname, host, error: null };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Multi-Tenant App" },
    {
      name: "description",
      content: "Welcome to Multi-tenant App with subdomain routing!",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { subdomain, path } = loaderData;

  return (
    <Routes>
      <ReactRouterRoute
        index
        element={
          <div>
            <h2>Welcome to Mulit tenant App</h2>
            <p>This is the main landing page for the root domain.</p>
            <p>{import.meta.env.VITE_TEST_VAR}</p>
          </div>
        }
      />
      {subdomain && (
        <>
          <ReactRouterRoute
            path={subdomain}
            element={<SubdomainHome subdomain={subdomain} />}
          />
          <ReactRouterRoute
            path={`/${subdomain}/dashboard`}
            element={<SubdomainDashboard subdomain={subdomain} />}
          />
        </>
      )}
    </Routes>
  );
}
