import { Progress } from "@/components/ui/progress";
import styles from "./user-info.module.css";
import { Edit, Mail, MapPin, ShieldUser, Smartphone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditUser } from "./edit-user.component";

export const UserInfo = () => {
  return (
    <section className={styles.userInfo}>
      <div className={styles.userData}>
        <h2 className={styles.title}>Perfil Completado</h2>

        <Progress value={54} className={styles.progressBar} />

        <section className={styles.row}>
          <span className={styles.rowHeading}>
            <User />
            <span>Usuario:</span>
          </span>
          <span className={styles.rowValue}>qbixmex</span>
        </section>

        <section className={styles.row}>
          <span className={styles.rowHeading}>
            <Mail />
            <span>Correo Electrónico:</span>
          </span>
          <span className={styles.rowValue}>qbixmex@gmail.com</span>
        </section>

        <section className={styles.row}>
          <span className={styles.rowHeading}>
            <Smartphone />
            <span>Teléfono:</span>
          </span>
          <span className={styles.rowValue}>(+52) 555-444-2222</span>
        </section>

        <section className={styles.row}>
          <span className={styles.rowHeading}>
            <MapPin />
            <span>Ciudad:</span>
          </span>
          <span className={styles.rowValue}>Guadalajara</span>
        </section>

        <section className={styles.row}>
          <span className={styles.rowHeading}>
            <ShieldUser />
            <span>Rol:</span>
          </span>
          <span className={styles.rowValue}>
            <Badge variant="outline" className={styles.rowBadge}>Administrador</Badge>
          </span>
        </section>

        <section className={styles.date}>
          <span>Registrado el 22 de Marzo, 2024.</span>
        </section>

        <Sheet>
          <SheetTrigger className={styles.editButton}>
            <Edit />
          </SheetTrigger>
          <EditUser />
        </Sheet>
      </div>
    </section>
  );
};

export default UserInfo;