import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import SignupForm from "@/components/SignupForm";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventDetailPage({
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
    <div className="detail-outer">
      <div className="detail-inner">
        <BackButton fallback="/#events" className="back-link" />

        {/* Tags */}
        {event.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
            {event.tags.map((tag: string) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="detail-heading">{event.title}</h1>

        {/* Meta grid */}
        <div className="detail-meta-grid">
          <div className="detail-meta-item">
            <span className="detail-meta-label">Date</span>
            <span className="detail-meta-value">{formatDate(event.date)}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Time</span>
            <span className="detail-meta-value">{event.time}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Venue</span>
            <span className="detail-meta-value">{event.location}</span>
          </div>
          {event.address && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Address</span>
              <span className="detail-meta-value">{event.address}</span>
            </div>
          )}
          {event.capacity && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Capacity</span>
              <span className="detail-meta-value">{event.capacity} guests</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="detail-body">
          {event.body.split("\n\n").map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Ornament */}
        <div className="detail-ornament">✦ ✦ ✦</div>

        {/* Signup */}
        <SignupForm eventId={event.id} />
      </div>
    </div>
  );
}
