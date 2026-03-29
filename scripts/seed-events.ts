import { createClient } from "@supabase/supabase-js";
import { events } from "../lib/events";

const supabase = createClient(
  "https://peaivgwtdmytzlqtfksc.supabase.co",
  "sb_publishable_L0m4ncWiiiBxDtDmk3iMoA_JBXIk9RX"
);

async function seed() {
  const { error } = await supabase.from("events").upsert(events);
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  console.log(`Seeded ${events.length} events.`);
}

seed();
