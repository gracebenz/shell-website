import Link from "next/link";
import EventForm from "@/components/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-xl">
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-8"
      >
        ← Events
      </Link>
      <h1 className="font-serif text-3xl font-bold text-heading mb-8">New Event</h1>
      <EventForm />
    </div>
  );
}
