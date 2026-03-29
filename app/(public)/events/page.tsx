import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="px-6 md:px-12 py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-10"
      >
        ← Home
      </Link>

      <h1 className="font-serif text-4xl md:text-5xl font-bold text-heading mb-2">
        Events
      </h1>
      <p className="text-ink/50 text-sm mb-12">
        Upcoming gatherings. Click to learn more and sign up.
      </p>

      {!events?.length ? (
        <p className="text-ink/30 text-sm">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-rim/40 bg-surface/20 hover:bg-surface/40 p-8 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-ink/50 font-medium">
                <span>{formatDate(event.date)}</span>
                <span>·</span>
                <span>{event.time}</span>
              </div>

              <h2 className="font-serif text-xl font-bold text-heading leading-snug">
                {event.title}
              </h2>

              <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
                {event.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-ink/50">{event.location}</span>
                <span className="text-xs text-accent font-medium group-hover:underline">
                  Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
