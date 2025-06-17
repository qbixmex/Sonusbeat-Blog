import AppAreaChart from "@/components/app-area-chart.component";
import AdminLayout from "../admin.layout";
import { ChartBarMultiple } from "@/components/app-bar-chart.component";
import AppPieChart from "@/components/app-pie-chart.component";
import { CardList } from "@/components/card-list.component";
import { TodoList } from "@/components/todo-list.component";

const DashboardPage = async () => {
  return (
    <AdminLayout>      
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5">
        <div className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <ChartBarMultiple />
        </div>
        <div className="bg-secondary p-5 rounded-lg">
          <AppPieChart />
        </div>
        <div className="bg-secondary p-5 rounded-lg">
          <CardList title="Últimas Transacciones" />
        </div>
        <div className="bg-secondary p-5 rounded-lg">
          <CardList title="Contenido Popular" />
        </div>
        <div className="bg-secondary p-5 rounded-lg">
          <TodoList />
        </div>
        <div className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppAreaChart />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
