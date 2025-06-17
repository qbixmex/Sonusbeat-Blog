import AdminLayout from "../admin.layout";

const DashboardPage = async () => {
  return (
    <AdminLayout>      
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5">
        <div className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">Widget</div>
        <div className="bg-secondary p-5 rounded-lg">Widget</div>
        <div className="bg-secondary p-5 rounded-lg">Widget</div>
        <div className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">Widget</div>
        <div className="bg-secondary p-5 rounded-lg">Widget</div>
        <div className="bg-secondary p-5 rounded-lg">Widget</div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
