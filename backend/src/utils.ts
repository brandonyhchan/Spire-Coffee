import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  userId: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getUserId(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer", "");

  if (!token) {
    throw new Error("No token found");
  }
  return jwt.verify(token, <jwt.Secret>process.env.PUBLIC_KEY, {
    algorithms: ["RS256"],
  }) as AuthTokenPayload;
}
