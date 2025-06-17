import AppAreaChart from "@/components/app-area-chart.component";
import AdminLayout from "../admin.layout";
import { ChartBarMultiple } from "@/components/app-bar-chart.component";
import AppPieChart from "@/components/app-pie-chart.component";
import { CardList } from "@/components/card-list.component";
import { Scroll } from "@/components/scroll.component";

const DashboardPage = async () => {
  return (
    <AdminLayout>      
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5">
        <section className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <ChartBarMultiple />
        </section>
        <section className="bg-secondary p-5 rounded-lg">
          <AppPieChart />
        </section>
        <section className="bg-secondary p-5 rounded-lg">
          <CardList title="Últimas Transacciones" />
        </section>
        <section className="bg-secondary p-5 rounded-lg">
          <CardList title="Contenido Popular" />
        </section>
        <section className="bg-secondary p-5 rounded-lg">
          <Scroll />
        </section>
        <section className="bg-secondary p-5 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppAreaChart />
        </section>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
