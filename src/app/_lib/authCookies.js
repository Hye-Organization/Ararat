const { decode } = require("jsonwebtoken");
const { cookies } = require("next/headers");
const { createHash } = require("crypto");

export function getUserInfo() {
  const cookieJar = cookies();
  let user = decode(cookieJar.get("id_token").value);
  let gravHash = createHash("md5")
    .update(
      typeof user.email === "string" ? user.email.trim().toLowerCase() : ""
    )
    .digest("hex");
  user.image = `https://www.gravatar.com/avatar/${gravHash}`;
  return user;
}
