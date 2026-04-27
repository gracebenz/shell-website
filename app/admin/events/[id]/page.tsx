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
    <div style={{ maxWidth: "36rem" }}>
      <Link href="/admin/events" className="admin-btn-ghost" style={{ display: "inline-block", marginBottom: "2rem" }}>← Events</Link>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="admin-heading">Edit Event</h1>
        <div className="admin-rule" />
      </div>
      <EventForm event={event} />
    </div>
  );
}
