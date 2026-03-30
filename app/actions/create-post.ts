"use server";

import { createClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/slug";
import { redirect } from "next/navigation";

export type PostFormState = {
  status: "idle" | "error";
  message: string;
};

export async function createPost(
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

  const slug = slugify(title);
  const supabase = await createClient();

  const { error } = await supabase
    .from("posts")
    .insert({ slug, title, excerpt, body, published_at });

  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "A post with this title already exists." };
    }
    return { status: "error", message: `DB error: ${error.code} — ${error.message}` };
  }

  redirect("/admin/blog");
}
