import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import DeleteEventButton from "@/components/DeleteEventButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, date, location")
    .order("date", { ascending: true });

  return (
    <div style={{ maxWidth: "52rem" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <div>
          <h1 className="admin-heading">Events</h1>
          <div className="admin-rule" />
        </div>
        <Link href="/admin/events/new" className="admin-btn-primary">+ New event</Link>
      </div>

      {!events?.length ? (
        <p className="admin-empty">No events yet.</p>
      ) : (
        <div className="admin-table">
          {events.map((event) => (
            <div key={event.id} className="admin-row">
              <div>
                <div className="admin-row-title">{event.title}</div>
                <div className="admin-row-meta">{event.date} · {event.location}</div>
              </div>
              <div className="admin-actions">
                <Link href={`/admin/events/${event.id}`} className="admin-btn-ghost">Edit</Link>
                <DeleteEventButton id={event.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
