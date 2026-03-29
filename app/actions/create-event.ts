"use server";

import { createClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/slug";
import { redirect } from "next/navigation";

export type EventFormState = {
  status: "idle" | "error";
  message: string;
};

export async function createEvent(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const address = formData.get("address") as string;
  const description = formData.get("description") as string;
  const body = formData.get("body") as string;
  const capacity = Number(formData.get("capacity"));
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!title || !date || !time || !location || !address || !description || !body || !capacity) {
    return { status: "error", message: "All fields are required." };
  }

  const id = slugify(title);
  const supabase = await createClient();

  const { error } = await supabase.from("events").insert({
    id,
    title,
    date,
    time,
    location,
    address,
    description,
    body,
    capacity,
    tags,
  });

  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "An event with this title already exists." };
    }
    return { status: "error", message: `DB error: ${error.code} — ${error.message}` };
  }

  redirect("/admin/events");
}
