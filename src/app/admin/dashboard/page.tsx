import { AdminNavbar } from "../(components)/navbar/admin-navbar.component";
import AdminLayout from "../admin.layout";
import { MainContainer } from "@/components/main-container.component";

const DashboardPage = async () => {
  return (
    <AdminLayout>
      <AdminNavbar />
      <MainContainer>
        <h1>Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cum excepturi reprehenderit, culpa officia amet, quae omnis soluta consectetur voluptatum velit dignissimos, exercitationem commodi adipisci voluptates explicabo. Est, perferendis animi?</p>
      </MainContainer>
    </AdminLayout>
  );
};

export default DashboardPage;
