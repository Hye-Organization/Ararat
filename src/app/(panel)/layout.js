import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../_lib/users";
import { getUserInfo } from "../_lib/authCookies";

export default async function Layout({ children }) {
  let cookieJar = cookies();
  if (!cookieJar.has("access_token")) {
    redirect("/auth/login");
  }
  let currentUser = await getCurrentUser();
  let userInfo = await getUserInfo();
  let user = {
    ...currentUser,
    ...userInfo,
  };

  return (
    <>
      <Sidebar userInfo={user}>{children}</Sidebar>
    </>
  );
}
