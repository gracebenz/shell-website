import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <main className="flex-1 px-6 md:px-12 py-10">{children}</main>
    </>
  );
}
