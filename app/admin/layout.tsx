import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <main style={{ flex: 1, padding: "3rem 5vw", maxWidth: "72rem", width: "100%" }}>{children}</main>
    </>
  );
}
