import Nav from "@/components/Nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="site-footer">
        <span className="footer-copy">© Shell Tu</span>
        <span className="footer-ornament">✦</span>
        <span className="footer-copy">A Glass or Tu</span>
      </footer>
    </>
  );
}
