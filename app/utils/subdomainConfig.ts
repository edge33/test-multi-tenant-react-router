/**
 * Subdomain configuration and validation utilities
 */

// List of reserved subdomains that cannot be used for tenants
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "app",
  "mail",
  "ftp",
  "webmail",
  "smtp",
  "pop",
  "imap",
  "blog",
  "shop",
  "store",
  "cdn",
  "static",
  "assets",
  "media",
];

/**
 * Check if a subdomain is reserved and cannot be used for tenants
 */
export function isReservedSubdomain(subdomain: string | null): boolean {
  if (!subdomain) return false;
  return RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase());
}

/**
 * Validate if a subdomain is allowed
 * You can extend this to check against a database of allowed subdomains
 */
export function isValidSubdomain(subdomain: string | null): boolean {
  if (!subdomain) return false;

  // Check if reserved
  if (isReservedSubdomain(subdomain)) {
    return false;
  }

  // Check format: only lowercase letters, numbers, and hyphens
  // Must start and end with alphanumeric
  const subdomainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  if (!subdomainRegex.test(subdomain)) {
    return false;
  }

  // Check length (3-63 characters is typical)
  if (subdomain.length < 3 || subdomain.length > 63) {
    return false;
  }

  return true;
}

/**
 * Get a list of allowed subdomains from environment variables
 * Returns null if all subdomains are allowed
 */
export function getAllowedSubdomains(): string[] | null {
  const allowed = import.meta.env.VITE_ALLOWED_SUBDOMAINS;
  if (!allowed) return null;

  return allowed.split(",").map((s: string) => s.trim().toLowerCase());
}

/**
 * Check if a subdomain is in the allowed list
 * Returns true if no allowed list is configured (all allowed)
 */
export function isSubdomainAllowed(subdomain: string | null): boolean {
  if (!subdomain) return false;

  const allowedList = getAllowedSubdomains();

  // If no allowed list, all valid subdomains are allowed
  if (!allowedList) return isValidSubdomain(subdomain);

  // Check if in allowed list
  return allowedList.includes(subdomain.toLowerCase());
}
