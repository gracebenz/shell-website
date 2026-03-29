import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import SignupForm from "@/components/SignupForm";

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
    <div className="px-6 md:px-12 py-14 max-w-2xl">
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-10"
      >
        ← All events
      </Link>

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

      <h1 className="font-serif text-4xl md:text-5xl font-bold text-heading leading-tight mb-6">
        {event.title}
      </h1>

      <div className="flex flex-col gap-1 text-sm text-ink/60 mb-10 border-l-2 border-rim pl-4">
        <span>{formatDate(event.date)} · {event.time}</span>
        <span>{event.location}</span>
        <span>{event.address}</span>
        <span>{event.capacity} person max</span>
      </div>

      <div className="space-y-4 text-ink/80 leading-relaxed text-base mb-14">
        {event.body.split("\n\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="rounded-2xl border border-rim/40 bg-surface/20 p-8">
        <h2 className="font-serif text-xl font-bold text-heading mb-6">Sign up</h2>
        <SignupForm eventId={event.id} />
      </div>
    </div>
  );
}
