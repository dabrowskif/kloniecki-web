import crypto from "crypto";

export const generateRandomToken = (length = 32) => {
  const bytes = crypto.randomBytes(length);
  return bytes.toString("base64").slice(0, length);
};
