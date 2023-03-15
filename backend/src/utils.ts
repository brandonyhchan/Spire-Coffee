import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
export const APP_SECRET = "SpireCawfee";

export interface AuthTokenPayload {
  userId: number;
}

// function getTokenPayload(token) {
//   return jwt.verify(token, APP_SECRET);
// }

// export function getUserId(req, authToken) {
//   if (req) {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.replace("Bearer", "");
//       if (!token) {
//         throw new AuthenticationError("User is not authenticated");
//       }
//       const userId = getTokenPayload(token);
//       return userId;
//     }
//   } else if (authToken) {
//     const userId = getTokenPayload(authToken);
//     return userId;
//   }

//   throw new AuthenticationError("User is not authenticated ");
// }

// eslint-disable-next-line @typescript-eslint/ban-types
export function getUserId(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer", "");
  
  if (!token) {
    throw new Error("No token found");
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
