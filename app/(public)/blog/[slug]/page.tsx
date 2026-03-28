export const dynamic = "force-dynamic";

export default function BlogPostPage() {
  return (
    <div className="px-6 md:px-12 py-14 max-w-2xl">
      <h1 className="font-serif text-4xl font-bold text-midnight-violet mb-3">Post title</h1>
      <p className="text-xs text-ink/40 font-sans mb-10">Date</p>
      <div className="text-ink/30 text-sm font-sans">Post content will appear here.</div>
    </div>
  );
}
