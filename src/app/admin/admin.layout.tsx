import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AdminNavbar } from "./(components)/navbar/admin-navbar.component";
import { AppSidebar } from "@/components/sidebar/app-sidebar.component";

export const metadata: Metadata = {
  title: "Sonusbeat Blog - Admin",
  description: "Panel de administración del blog Sonusbeat",
  robots: "noindex, nofollow",
};

type Props = Readonly<{ children: React.ReactNode; }>;

const AdminLayout: React.FC<Props> = async ({ children }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <aside>
        <AppSidebar />
      </aside>
      <main>
        <AdminNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
