import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import HomeNav from "@/components/HomeNav";
import HeroAnchorNav from "@/components/HeroAnchorNav";

export const dynamic = "force-dynamic";

function formatEventDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatPostDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseTimeMinutes(t: string): number {
  const [time, period] = t.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const [{ data: rawEvents }, { data: posts }] = await Promise.all([
    supabase.from("events").select("*").gte("date", today).order("date", { ascending: true }).limit(6),
    supabase.from("posts").select("slug, title, excerpt, published_at").order("published_at", { ascending: false }).limit(5),
  ]);

  const events = (rawEvents ?? []).sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return parseTimeMinutes(a.time) - parseTimeMinutes(b.time);
  });

  return (
    <>
      <HomeNav />

      {/* ── HERO — typographic composition ───────── */}
      <section id="hero" className="hero-section">
        <div className="hero-accent-bar" />

        {/* Masthead strip */}
        <div className="hero-masthead">
          <span>Est. 2025 · New York</span>
          <Link href="/" className="hero-masthead-brand">A Glass or Tu</Link>
          <span>&nbsp;</span>
        </div>

        {/* Title */}
        <div className="hero-title">
          <span className="hero-line-a">A</span>
          <span className="hero-line-glass">Glass</span>
          <span className="hero-line-ortu">or Tu</span>
        </div>

        {/* Anchor nav */}
        <HeroAnchorNav />

        {/* Scroll cue */}
        <div className="hero-scroll-cue">Scroll</div>
      </section>

      {/* ── EVENTS — reservation ledger ─────────── */}
      <section id="events" className="section-wrap">
        <div className="section-header">
          <span className="section-label">Upcoming</span>
          <div className="section-rule" />
          {events.length > 0 && (
            <span className="section-count">{events.length} gathering{events.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        {!events.length ? (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "var(--text-md)", color: "var(--color-dim)" }}>
            No gatherings scheduled.
          </p>
        ) : (
          <>
            <div className="ledger">
              {events.map((event, i) => (
                <Link key={event.id} href={`/events/${event.id}`} className="ledger-row">
                  <span className="ledger-index">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ledger-main">
                    <span className="ledger-date">{formatEventDate(event.date)} · {event.time}</span>
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
              ))}
            </div>
            <Link href="/events" className="see-all">All gatherings →</Link>
          </>
        )}
      </section>

      {/* Thin divider */}
      <div style={{ height: "1px", background: "rgba(184,150,46,0.12)", margin: "0 5vw" }} />

      {/* ── JOURNAL — editorial list ─────────────── */}
      <section id="blog" className="section-wrap">
        <div className="section-header">
          <span className="section-label">Journal</span>
          <div className="section-rule" />
        </div>

        {!posts?.length ? (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "var(--text-md)", color: "var(--color-dim)" }}>
            No entries yet.
          </p>
        ) : (
          <>
            <div className="journal-list" style={{ borderTop: "1px solid rgba(240,232,216,0.06)" }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="journal-entry">
                  <div>
                    <span className="journal-marker">✦</span>
                    <span className="journal-title">{post.title}</span>
                    {post.excerpt && <p className="journal-excerpt">{post.excerpt}</p>}
                  </div>
                  <span className="journal-date">{formatPostDate(post.published_at)}</span>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="see-all">All entries →</Link>
          </>
        )}
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="site-footer">
        <span className="footer-copy">© Shell Tu</span>
        <span className="footer-ornament">✦</span>
        <span className="footer-copy">A Glass or Tu</span>
      </footer>
    </>
  );
}
