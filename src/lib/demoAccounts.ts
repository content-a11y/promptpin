export type DemoRole = "viewer" | "admin" | "super_admin";

export type DemoAccount = {
  email: string;
  password: string;
  name: string;
  handle: string;
  role: DemoRole;
};

export const DEMO_AUTH_KEY = "promptpin-demo-auth";
export const DEMO_USER_KEY = "promptpin-demo-user";
export const DEMO_AUTH_EVENT = "promptpin-demo-auth-change";

export const demoAccounts: DemoAccount[] = [
  {
    email: "viewer@promptpin.test",
    password: "Viewer@123",
    name: "Viewer User",
    handle: "@viewer",
    role: "viewer",
  },
  {
    email: "admin@promptpin.test",
    password: "Admin@123",
    name: "Admin User",
    handle: "@admin",
    role: "admin",
  },
  {
    email: "super@promptpin.test",
    password: "Super@123",
    name: "Super Admin",
    handle: "@superadmin",
    role: "super_admin",
  },
];

export function getDemoAccount(email: string, password: string) {
  return demoAccounts.find(
    (account) =>
      account.email.toLowerCase() === email.trim().toLowerCase() &&
      account.password === password,
  );
}
