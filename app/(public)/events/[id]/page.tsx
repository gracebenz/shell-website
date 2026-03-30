import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import SignupForm from "@/components/SignupForm";
import BackButton from "@/components/BackButton";
import WavyRule from "@/components/WavyRule";

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
    <div className="flex-1 px-6 md:px-12 py-10" style={{ backgroundColor: "#2d0719" }}>
      <div className="max-w-2xl mx-auto rounded-3xl py-12 px-8 md:px-14" style={{ backgroundColor: "#e9c3b9" }}>
      <BackButton
        fallback="/#events"
        className="inline-flex items-center gap-1 text-sm uppercase tracking-wide text-ink/70 hover:text-accent transition-colors mb-10 bg-transparent border-0 p-0 cursor-pointer"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {event.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full border border-rim/60 text-ink/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1
        className="text-5xl md:text-6xl leading-tight mb-6"
        style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#2d0719" }}
      >
        {event.title}
      </h1>

      <div className="flex gap-4 mb-10">
        <svg width="14" height="88" viewBox="0 0 14 120" style={{ flexShrink: 0 }}>
          <path
            d="M7,0 C14,15 0,30 7,45 C14,60 0,75 7,90 C14,105 0,120 7,120"
            stroke="#f0494e"
            strokeWidth="0.8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="flex flex-col gap-1 text-sm text-ink/60">
          <span>{formatDate(event.date)} · {event.time}</span>
          <span>{event.location}</span>
          <span>{event.address}</span>
          <span>{event.capacity} person max</span>
        </div>
      </div>

      <div className="space-y-4 text-ink/80 leading-relaxed text-base mb-14">
        {event.body.split("\n\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <SignupForm eventId={event.id} />
      </div>
    </div>
  );
}
