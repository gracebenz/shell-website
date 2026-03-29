"use server";

import { supabase } from "@/lib/supabase";

const confirmations = [
  "You're in! We're grape-ful you're joining us.",
  "Spot secured! We're fermenting with excitement.",
  "You're on the list! This calls for a toast — bread or glass, your pick.",
  "Signed, sealed, delivered — you're on a roll (the bread kind).",
  "Consider yourself corked in. See you there!",
  "You're in! We're in a real pickle of delight.",
  "Un-brie-lievable! Your name is on the list.",
  "You're added! Butter believe we can't wait to see you.",
  "You're in! We're absolutely wine-ing with joy.",
  "No small potatoes — you've officially got a spot.",
];

function randomConfirmation() {
  return confirmations[Math.floor(Math.random() * confirmations.length)];
}

export type SignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function signupForEvent(
  eventId: string,
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const name = formData.get("name");

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { status: "error", message: "Please enter your name." };
  }

  const { error } = await supabase
    .from("signups")
    .insert({ event_id: eventId, name: name.trim() });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: randomConfirmation() };
}
