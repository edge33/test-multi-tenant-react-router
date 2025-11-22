export const getSubdomain = (url: string) => {
  const theUrl = new URL(url);
  const host = theUrl.hostname;
  if (!host) {
    return null;
  }

  // Remove port if present, e.g., "subdomain.app.com:3000"
  const hostname = host.split(":")[0];

  // In development, you can test subdomains using hosts file or tools like ngrok
  // For localhost testing, you can use: tenant1.localhost:5173
  if (import.meta.env?.DEV) {
    // Allow localhost subdomain testing
    if (hostname.includes("localhost")) {
      const parts = hostname.split(".");
      const fakeSubdomain = theUrl.pathname.split("/")[1];
      return fakeSubdomain;
    }
    // For development without subdomain setup, return null
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return null;
    }
  }

  const parts = hostname.split(".");

  // Need at least 2 parts for a subdomain (subdomain.domain.com or subdomain.localhost)
  if (parts.length < 2) {
    return null;
  }

  // If it's just domain.com (2 parts) or localhost, no subdomain
  if (parts.length === 2) {
    return null;
  }

  // Return the first part as the subdomain
  // For subdomain.example.com, returns "subdomain"
  // For www.example.com, returns "www"
  const subdomain = parts[0];

  // Optionally filter out "www" if you don't want it treated as a subdomain
  if (subdomain === "www") {
    return null;
  }

  return subdomain;
};
