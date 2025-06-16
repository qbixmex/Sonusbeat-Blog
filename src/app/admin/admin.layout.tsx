import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sonusbeat Blog - Admin",
  description: "Panel de administración del blog Sonusbeat",
  robots: "noindex, nofollow",
};

type Props = Readonly<{ children: React.ReactNode; }>;

const AdminLayout: React.FC<Props> = async ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default AdminLayout;
