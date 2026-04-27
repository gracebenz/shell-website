"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
  status: "idle" | "error";
  message: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { status: "error", message: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set("shell-admin", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/admin");
}
