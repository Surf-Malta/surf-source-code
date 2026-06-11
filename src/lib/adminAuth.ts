import dbConnect from "./mongodb";
import User from "./models/User";

export async function validateToken(token: string | null): Promise<any | null> {
  if (!token) return null;
  await dbConnect();

  // Seed demo users if empty
  const count = await User.countDocuments();
  if (count === 0) {
    await User.create([
      { email: "admin@sourcecode.dev", password: "admin123", role: "super_admin", name: "Source Code" },
      { email: "editor@sourcecode.dev", password: "editor123", role: "editor", name: "Sarah Borg" },
      { email: "admin@surftechnology.mt", password: "admin123", role: "super_admin", name: "Source Code" },
      { email: "editor@surftechnology.mt", password: "editor123", role: "editor", name: "Sarah Borg" }
    ]);
  }

  // A simple mock session validation since it uses localStorage mock token format
  if (token.startsWith("mock-session-token-") || token === "mock-session-token") {
    // Return a default super admin for simple mock compatibility
    return { email: "admin@surftechnology.mt", role: "super_admin", name: "Source Code" };
  }

  // Look up user by email encoded in token if we want persistent sessions
  // (We'll store token as email or simple session map, but to be robust, let's also allow token to just be "admin" or "editor")
  if (token === "admin-token" || token.includes("admin")) {
    return { email: "admin@sourcecode.dev", role: "super_admin", name: "Source Code" };
  }
  if (token === "editor-token" || token.includes("editor")) {
    return { email: "editor@sourcecode.dev", role: "editor", name: "Sarah Borg" };
  }

  return null;
}
