import { getImageUrl } from "@/app/_lib/gravatar";
import Tabs from "@/app/_lib/hyeui/components/tabs";
import prisma from "@/app/_lib/prisma";
import { FaUser, FaListCheck } from "react-icons/fa6";
import UserTabs from "./userTabs";
import { getCurrentUser } from "@/app/_lib/users";

export default async function UserLayout({ params, children }) {
  let requestingUser = await getCurrentUser();
  let validRoles = ["viewer", "operator", "manager"];
  if (
    !validRoles.includes(requestingUser.adminRole) &&
    !validRoles.includes(requestingUser.usersRole)
  ) {
    return <p>You do not have permission to view this page</p>;
  }
  const user = await prisma.user
    .findUnique({
      where: {
        id: params.id,
      },
    })
    .catch((e) => {
      console.error(e);
    });
  let gravatarUrl = getImageUrl(user.email);

  return (
    <>
      <div className="flex">
        <img src={gravatarUrl} className="w-20 h-20 rounded-full" />
        <div className="ml-4 my-auto">
          <p className="text-3xl font-bold">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="text-lg text-gray-400">{user.email}</p>
        </div>
      </div>
      <UserTabs user={user} />
      <div className="mb-2" />
      {children}
    </>
  );
}
