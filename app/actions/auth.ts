"use server";

import { createClient } from "@/lib/supabase-server";

const ALLOWED_EMAILS = [
  "gracebenz2@gmail.com",
  "shelltu118@gmail.com",
];

export type LoginState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendMagicLink(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { status: "error", message: "Please enter an email address." };
  }

  if (!ALLOWED_EMAILS.includes(email.trim().toLowerCase())) {
    return { status: "error", message: "This email is not authorized." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: "Check your email for a login link." };
}
