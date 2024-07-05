import { Issuer } from "openid-client";

let issuer = await Issuer.discover(process.env.OIDC_ISSUER);
let oidcClient = new issuer.Client({
  client_id: process.env.OIDC_CLIENT_ID,
  redirect_uris: [process.env.URI + "/auth/callback"],
  response_types: ["code"],
});

export default oidcClient;
