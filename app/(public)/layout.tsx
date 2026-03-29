import Nav from "@/components/Nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <footer className="px-6 md:px-12 py-6 text-xs text-ink/40 border-t border-rim/40 font-sans tracking-wide">
        © {new Date().getFullYear()} Shell
      </footer>
    </>
  );
}
