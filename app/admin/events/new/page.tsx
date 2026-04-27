import Link from "next/link";
import EventForm from "@/components/EventForm";

export default function NewEventPage() {
  return (
    <div style={{ maxWidth: "36rem" }}>
      <Link href="/admin/events" className="admin-btn-ghost" style={{ display: "inline-block", marginBottom: "2rem" }}>← Events</Link>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="admin-heading">New Event</h1>
        <div className="admin-rule" />
      </div>
      <EventForm />
    </div>
  );
}
