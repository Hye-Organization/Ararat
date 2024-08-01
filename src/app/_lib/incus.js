import { connectOIDC } from "incus";
import { cookies } from "next/headers";

/**
 *
 * @param {string} nodeUrl
 * @returns {import("axios").AxiosInstance}
 */
export default function incusClient(nodeUrl) {
  const cookieJar = cookies();
  const accessToken = cookieJar.get("access_token").value;
  let incus = connectOIDC(nodeUrl, accessToken);
  return incus;
}
