"use server";

import { cookies } from "next/headers";
import prisma from "./prisma";
import { decode } from "jsonwebtoken";

export async function importUser(firstName, lastName, email, id) {
  let requestingUser = await getCurrentUser();
  if (
    requestingUser.adminRole != "manager" &&
    requestingUser.usersRole != "manager"
  ) {
    return { error: "You do not have permission to import users" };
  }
  if (!firstName || !lastName || !email || !id) {
    return { error: "Missing required fields" };
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  if (!validateEmail(email)) {
    return { error: "Invalid email address" };
  }
  let importedUser;
  try {
    importedUser = await prisma.user.create({
      data: {
        id: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to import the user. Does it already exist?",
    };
  }

  return importedUser;
}

export async function deleteUser(id) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to delete the user. Does it exist?",
    };
  }
  return true;
}

export async function updateUser(id, body) {
  let requestingUser = await getCurrentUser();
  let requestingAdminRole = requestingUser.adminRole;
  let requestingUsersRole = requestingUser.usersRole;
  let userToUpdate;
  try {
    userToUpdate = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to update the user. Does it exist?",
    };
  }
  if (
    requestingAdminRole != "manager" &&
    requestingAdminRole != "operator" &&
    requestingUsersRole != "manager" &&
    requestingUsersRole != "operator"
  ) {
    return { error: "You do not have permission to update this user" };
  }
  if (
    requestingAdminRole == "operator" &&
    (body.adminRole == "manager" || body.adminRole == "operator")
  ) {
    return { error: "You cannot give a user higher permissions than yourself" };
  }
  if (
    requestingUsersRole == "operator" &&
    (body.usersRole == "manager" || body.usersRole == "operator")
  ) {
    return { error: "You cannot give a user higher permissions than yourself" };
  }
  if (
    (userToUpdate.adminRole == "manager" && body.adminRole == "operator") ||
    (userToUpdate.usersRole == "manager" && body.usersRole == "operator")
  ) {
    return {
      error:
        "You are not allowed to update permissions of users with higher roles than you",
    };
  }
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: body,
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to update the user. Does it exist?",
    };
  }
  return true;
}

export async function getUser(id) {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to get the user. Does it exist?",
    };
  }
  return user;
}

export async function getCurrentUser() {
  let cookieJar = new cookies();
  if (!cookieJar.has("id_token")) {
    return { error: "No token found" };
  }
  let decoded = decode(cookieJar.get("id_token").value);
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });
  } catch (error) {
    return {
      error:
        "An internal error occured while attempting to get the user. Does it exist?",
    };
  }
  return user;
}
