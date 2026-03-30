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
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-heading">Events</h1>
          <div style={{ width: "32px", height: "1px", backgroundColor: "#f0494e", marginTop: "6px" }} />
        </div>
        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-heading text-canvas text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
        >
          + New event
        </Link>
      </div>

      {!events?.length ? (
        <p className="text-ink/30 text-sm">No events yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-rim/30">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-ink">{event.title}</p>
                <p className="text-xs text-ink/50 mt-0.5">{event.date} · {event.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="text-xs text-accent hover:underline"
                >
                  Edit
                </Link>
                <DeleteEventButton id={event.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
