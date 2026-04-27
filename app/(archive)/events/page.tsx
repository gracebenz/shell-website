import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import PerPageSetter from "@/components/PerPageSetter";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
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

  const Pagination = () => totalPages > 1 ? (
    <div className="pagination">
      {page > 1 ? (
        <Link href={pageUrl(page - 1)} className="page-link">← Prev</Link>
      ) : (
        <span className="page-link dim">← Prev</span>
      )}
      <span className="page-count">
        {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      {page < totalPages ? (
        <Link href={pageUrl(page + 1)} className="page-link">Next →</Link>
      ) : (
        <span className="page-link dim">Next →</span>
      )}
    </div>
  ) : null;

  return (
    <div className="archive-wrap">
      <PerPageSetter scrollId="events-scroll" cardsId="events-cards" gapH={0} maxCols={1} />

      <div id="events-scroll" className="archive-scroll">

        <Link href="/#events" className="back-link">← Back</Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h1 className="archive-heading">Events</h1>
          <form method="GET" action="/events" style={{ display: "flex", alignItems: "center", paddingBottom: "0.75rem" }}>
            {filter !== "upcoming" && <input type="hidden" name="filter" value={filter} />}
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search gatherings..."
              className="search-field"
            />
          </form>
        </div>

        {/* Section rule */}
        <div style={{ height: "1px", background: "rgba(184,150,46,0.2)", marginBottom: "1.5rem" }} />

        {/* Filter pills */}
        <div className="filter-row">
          {(["upcoming", "past", "all"] as Filter[]).map((f) => (
            <Link
              key={f}
              href={filterUrl(f)}
              className={`filter-pill${filter === f ? " active" : ""}`}
            >
              {f === "all" ? "All" : f === "upcoming" ? "Upcoming" : "Past"}
            </Link>
          ))}
        </div>

        {/* Ledger */}
        {!events.length ? (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "var(--text-md)", color: "var(--color-dim)" }}>
            {q ? `No gatherings matching "${q}".` : filter === "past" ? "No past gatherings." : "No upcoming gatherings."}
          </p>
        ) : (
          <div className="ledger" id="events-cards">
            {events.map((event, i) => {
              const isPast = event.date < today;
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="ledger-row"
                  style={{ opacity: isPast ? 0.55 : 1 }}
                >
                  <span className="ledger-index">{String(start + i + 1).padStart(2, "0")}</span>
                  <div className="ledger-main">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span className="ledger-date">{formatDate(event.date)} · {event.time}</span>
                      {isPast && <span className="past-badge">Past</span>}
                    </div>
                    <span className="ledger-title">{event.title}</span>
                    {event.description && (
                      <span className="ledger-desc" style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}>
                        {event.description}
                      </span>
                    )}
                  </div>
                  <div className="ledger-meta">
                    <span className="ledger-place">{event.location}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {totalPages > 1 && <Pagination />}

      <footer className="site-footer">
        <span className="footer-copy">© Shell Tu</span>
        <span className="footer-ornament">✦</span>
        <span className="footer-copy">A Glass or Tu</span>
      </footer>
    </div>
  );
}
