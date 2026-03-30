"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export type PostFormState = {
  status: "idle" | "error";
  message: string;
};

export async function updatePost(
  slug: string,
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const body = formData.get("body") as string;
  const published_at = formData.get("published_at") as string;

  if (!title || !excerpt || !body || !published_at) {
    return { status: "error", message: "All fields are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ title, excerpt, body, published_at })
    .eq("slug", slug);

  if (error) {
    return { status: "error", message: `DB error: ${error.code} — ${error.message}` };
  }

  redirect("/admin/blog");
}

export async function deletePost(slug: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("slug", slug);
  redirect("/admin/blog");
}
