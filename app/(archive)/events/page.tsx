import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import PerPageSetter from "@/components/PerPageSetter";
import WavyRule from "@/components/WavyRule";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

function parseTimeMinutes(t: string): number {
  const [time, period] = t.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

type Filter = "all" | "upcoming" | "past";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string; page?: string; perPage?: string }>;
}) {
  const { filter: rawFilter, q = "", page: rawPage, perPage: rawPerPage } = await searchParams;
  const PER_PAGE = Math.max(4, parseInt(rawPerPage ?? "8", 10));
  const filter: Filter = rawFilter === "past" ? "past" : rawFilter === "all" ? "all" : "upcoming";
  const page = Math.max(1, parseInt(rawPage ?? "1", 10));
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  let query = supabase.from("events").select("*", { count: "exact" });
  if (filter === "upcoming") query = query.gte("date", today);
  else if (filter === "past") query = query.lt("date", today);
  if (q) query = query.ilike("title", `%${q}%`);
  query = query.order("date", { ascending: filter !== "past" }).range(start, end);

  const { data: raw, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / PER_PAGE);

  const events = (raw ?? []).sort((a, b) => {
    if (a.date !== b.date) return filter !== "past"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
    const diff = parseTimeMinutes(a.time) - parseTimeMinutes(b.time);
    return filter !== "past" ? diff : -diff;
  });

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (filter !== "upcoming") params.set("filter", filter);
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    if (rawPerPage) params.set("perPage", rawPerPage);
    const s = params.toString();
    return `/events${s ? `?${s}` : ""}`;
  }

  function filterUrl(f: Filter) {
    const params = new URLSearchParams();
    if (f !== "upcoming") params.set("filter", f);
    if (q) params.set("q", q);
    if (rawPerPage) params.set("perPage", rawPerPage);
    const s = params.toString();
    return `/events${s ? `?${s}` : ""}`;
  }

  const activePillStyle = { backgroundColor: "#2d0719", color: "#e9c3b9" };
  const inactivePillStyle = { color: "#6f4951" };

  const Pagination = () => totalPages > 1 ? (
    <div className="flex items-center justify-center gap-6">
      {page > 1 ? (
        <Link href={pageUrl(page - 1)} className="text-xs uppercase tracking-widest transition-colors hover:text-accent" style={{ color: "#2d0719" }}>
          ← Prev
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.3)" }}>← Prev</span>
      )}
      <span className="text-xs" style={{ color: "#6f4951" }}>
        {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      {page < totalPages ? (
        <Link href={pageUrl(page + 1)} className="text-xs uppercase tracking-widest transition-colors hover:text-accent" style={{ color: "#2d0719" }}>
          Next →
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.3)" }}>Next →</span>
      )}
    </div>
  ) : null;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#e9c3b9" }}>
      <PerPageSetter scrollId="events-scroll" cardsId="events-cards" gapH={16} maxCols={2} />

      {/* Scrollable content */}
      <div id="events-scroll" className="flex-1 overflow-y-auto no-scrollbar px-6 md:px-16 py-6 max-w-5xl mx-auto w-full">

        {/* Back button */}
        <Link href="/#events" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest transition-colors hover:text-accent mb-4" style={{ color: "#6f4951" }}>
          ← Back
        </Link>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <h1
            className="text-5xl md:text-6xl uppercase leading-none"
            style={{ fontFamily: "ZT Yaglo, sans-serif", fontWeight: 100, color: "#2d0719", letterSpacing: "0.1em" }}
          >
            Events
          </h1>
          <div className="w-12 mt-3" style={{ height: "1px", backgroundColor: "#f0494e" }} />
          <form method="GET" action="/events" className="flex items-center">
            {filter !== "upcoming" && <input type="hidden" name="filter" value={filter} />}
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search events..."
              className="text-sm outline-none"
              style={{
                backgroundColor: "#faf7f4",
                border: "1.5px solid rgba(111,73,81,0.35)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                color: "#2d0719",
                width: "min(100%, 280px)",
              }}
            />
          </form>
        </div>

        {/* Filter toggle */}
        <div className="mb-6">
          <div className="inline-flex gap-1 p-1 rounded-full" style={{ backgroundColor: "rgba(45,7,25,0.08)" }}>
            {(["upcoming", "past", "all"] as Filter[]).map((f) => (
              <Link key={f} href={filterUrl(f)}
                className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-colors"
                style={filter === f ? activePillStyle : inactivePillStyle}
              >
                {f === "all" ? "All" : f === "upcoming" ? "Upcoming" : "Past"}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid */}
        {!events.length ? (
          <p className="text-sm" style={{ color: "#6f4951" }}>
            {q ? `No events matching "${q}".` : filter === "past" ? "No past events." : "No upcoming events."}
          </p>
        ) : (
          <div id="events-cards" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => {
              const isPast = event.date < today;
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group flex flex-col gap-2 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#faf7f4",
                    border: "1px solid rgba(111,73,81,0.15)",
                    opacity: isPast ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(111,73,81,0.7)" }}>
                      {formatDate(event.date)} · {event.time}
                    </div>
                    {isPast && (
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(111,73,81,0.15)", color: "#6f4951" }}>
                        Past
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl leading-snug" style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#6f4951" }}>
                    {event.title}
                  </h2>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "rgba(45,7,25,0.7)" }}>
                    {event.description}
                  </p>
                  <span className="text-xs" style={{ color: "#6f4951" }}>{event.location}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Pinned bottom: pagination + footer */}
      {totalPages > 1 && (
        <div className="py-3 flex justify-center">
          <Pagination />
        </div>
      )}
      <div className="py-6 flex flex-col items-center gap-3">
        <WavyRule />
        <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.4)" }}>© Shell Tu</p>
      </div>
    </div>
  );
}
