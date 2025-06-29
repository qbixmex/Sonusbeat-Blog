import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AdminNavbar } from "./(components)/navbar/admin-navbar.component";
import { AppSidebar } from "@/components/sidebar/app-sidebar.component";
import MainContainer from "@/components/main-container.component";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sonusbeat Blog - Admin",
  description: "Panel de administración del blog Sonusbeat",
  robots: "noindex, nofollow",
};

type Props = Readonly<{ children: React.ReactNode; }>;

const AdminLayout: React.FC<Props> = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={session.user} />
      <SidebarInset>
        <header>
          <AdminNavbar user={session.user} />
        </header>
        <main className="w-full">
          <MainContainer>
            {children}
          </MainContainer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
