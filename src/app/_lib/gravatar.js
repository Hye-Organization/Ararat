import { createHash } from "crypto";

export function getImageUrl(email) {
  let gravHash = createHash("md5")
    .update(typeof email === "string" ? email.trim().toLowerCase() : "")
    .digest("hex");
  return `https://www.gravatar.com/avatar/${gravHash}`;
}
