export const dynamic = "force-dynamic";

export default function EventDetailPage() {
  return (
    <div className="px-6 md:px-12 py-14 max-w-2xl">
      <h1 className="font-serif text-4xl font-bold text-midnight-violet mb-6">Event</h1>

      {/* Event details placeholder */}
      <div className="text-ink/30 text-sm font-sans mb-12">Event details will appear here.</div>

      {/* Sign-up form placeholder */}
      <div className="border border-lilac-ash/40 rounded-2xl p-8">
        <h2 className="font-serif text-xl font-bold text-midnight-violet mb-4">Sign up</h2>
        <div className="text-ink/30 text-sm font-sans">Sign-up form will appear here.</div>
      </div>
    </div>
  );
}
