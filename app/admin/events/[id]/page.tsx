import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EventForm from "@/components/EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) notFound();

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-8"
      >
        ← Events
      </Link>
      <h1 className="font-serif text-3xl font-bold text-heading mb-8">Edit Event</h1>
      <EventForm event={event} />
    </div>
  );
}
