import Image from "next/image";
import Link from "next/link";
import oysters from "@/assets/oysters.jpg";
import { createClient } from "@/lib/supabase-server";
import HomeNav from "@/components/HomeNav";
import HeroAnchorNav from "@/components/HeroAnchorNav";
import WaveDivider from "@/components/WaveDivider";
import WavyRule from "@/components/WavyRule";

export const dynamic = "force-dynamic";

function formatEventDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

function formatPostDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
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

  const evtCount      = events.length;
  const isFeatured    = evtCount === 1;
  const isStack       = evtCount >= 2 && evtCount <= 3;
  const wrapperClass  = isFeatured
    ? "max-w-2xl w-full"
    : isStack
      ? "flex flex-col gap-8 max-w-2xl w-full"
      : "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full";
  const cardPadding   = isFeatured ? "p-10 md:p-12" : "p-10";
  const titleSize     = isFeatured ? "text-4xl" : isStack ? "text-3xl" : "text-2xl";
  const descClamp     = isFeatured ? "" : isStack ? "line-clamp-4" : "line-clamp-3";
  const hoverScale    = isFeatured ? "hover:scale-[1.01]" : "hover:scale-[1.015]";
  const cardStyle     = isFeatured
    ? { backgroundColor: "rgba(45,7,25,0.08)", borderLeft: "2px solid #f0494e" }
    : { backgroundColor: "rgba(45,7,25,0.07)", border: "1px solid rgba(111,73,81,0.45)" };

  return (
    <>
      <HomeNav />

      {/* Hero section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <Image src={oysters} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.08) 72%, transparent 100%)" }} />
        <div className="relative flex flex-col items-center gap-6 text-white">
          <h1
            style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", fontWeight: 700, color: "#f0494e", letterSpacing: "0.05em", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
            className="text-[4rem] md:text-[7rem] leading-none uppercase"
          >
            A Glass or Tu
          </h1>
          <HeroAnchorNav />
        </div>
        {/* Wave transition into events */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "48px" }}>
          <div style={{ position: "absolute", inset: 0, bottom: 0, top: "50%", backgroundColor: "#e9c3b9" }} />
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <path
              d="M0,24 C90,4 180,44 270,24 C360,4 450,44 540,24 C630,4 720,44 810,24 C900,4 990,44 1080,24 C1170,4 1260,44 1350,24 C1395,14 1420,34 1440,24"
              stroke="#f0494e"
              strokeWidth="1.2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </section>

      {/* Events section */}
      <section id="events" className="px-6 md:px-16 py-24" style={{ backgroundColor: "#e9c3b9" }}>
        <h2
          style={{ fontFamily: "ZT Yaglo, sans-serif", fontWeight: 100, color: "#2d0719", letterSpacing: "0.1em" }}
          className="text-4xl md:text-5xl uppercase mb-3"
        >
          Events
        </h2>
        <div className="w-16 mb-10" style={{ height: "1px", backgroundColor: "#f0494e" }} />

        {!events?.length ? (
          <p className="text-sm" style={{ color: "#6f4951" }}>No upcoming events.</p>
        ) : (
          <>
            <div className={wrapperClass}>
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className={`group flex flex-col gap-3 rounded-2xl ${cardPadding} transition-all duration-300 ${hoverScale}`}
                  style={cardStyle}
                >
                  <div className="text-xs uppercase tracking-widest" style={{ color: "#6f4951" }}>
                    {formatEventDate(event.date)} · {event.time}
                  </div>
                  <h3
                    className={`${titleSize} leading-snug`}
                    style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#2d0719" }}
                  >
                    {event.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mt-1 ${descClamp}`} style={{ color: "rgba(45,7,25,0.7)" }}>
                    {event.description}
                  </p>
                  <div className="flex items-end justify-between mt-3">
                    <span className="text-xs" style={{ color: "#6f4951" }}>{event.location}</span>
                    {isFeatured && (
                      <span className="text-xs tracking-wide uppercase" style={{ color: "#f0494e" }}>View event →</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/events"
              className="inline-block mt-10 text-sm tracking-wide uppercase transition-colors text-rim hover:text-accent"
            >
              See all →
            </Link>
          </>
        )}
      </section>

      <WaveDivider topColor="#e9c3b9" bottomColor="#d9e6f1" />

      {/* Blog section */}
      <section id="blog" className="px-6 md:px-16 py-24" style={{ backgroundColor: "#d9e6f1" }}>
        <h2
          style={{ fontFamily: "ZT Yaglo, sans-serif", fontWeight: 100, color: "#2d0719", letterSpacing: "0.1em" }}
          className="text-4xl md:text-5xl uppercase mb-3"
        >
          Blog
        </h2>
        <div className="w-16 mb-10" style={{ height: "1px", backgroundColor: "#f0494e" }} />

        {!posts?.length ? (
          <p className="text-sm" style={{ color: "#6f4951" }}>No posts yet.</p>
        ) : (
          <>
            <div className="flex flex-col divide-y max-w-2xl" style={{ borderColor: "rgba(111,73,81,0.25)" }}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 py-8 transition-all duration-300 hover:scale-[1.02] origin-left"
                >
                  <p className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.6)" }}>
                    {formatPostDate(post.published_at)}
                  </p>
                  <h3
                    className="text-2xl leading-snug"
                    style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#6f4951" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(45,7,25,0.6)" }}>
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="inline-block mt-10 text-sm tracking-wide uppercase transition-colors text-rim hover:text-accent"
            >
              See all →
            </Link>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="py-6 flex flex-col items-center gap-3" style={{ backgroundColor: "#d9e6f1" }}>
        <WavyRule />
        <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.4)" }}>© Shell Tu</p>
      </footer>
    </>
  );
}
