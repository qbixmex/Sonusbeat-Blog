import AdminLayout from "../../admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import styles from "./styles.module.css";
import { Badges } from "../(components)/badges.component";
import { UserInfo } from "../(components)/user-info.component";
import { CardList } from "@/components/card-list.component";
import { UserCard } from "../(components)/user-card.component";
import { MultiLineChart } from "@/components/app-multi-line-chart.component";

const SingleUserPage = () => {
  return (
    <AdminLayout>
      <article>
        <header>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users">Usuarios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Qbixmex</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.leftPanel}>
              <div className={styles.section}>
                <Badges />
              </div>
              <div className={styles.section}>
                <UserInfo />
              </div>
              <div className={styles.section}>
                <CardList title="Contenido Popular" content="popular-content" />
              </div>
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.section}>
                <UserCard />
              </div>
              <div className={styles.section}>
                <MultiLineChart />
              </div>
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default SingleUserPage;
