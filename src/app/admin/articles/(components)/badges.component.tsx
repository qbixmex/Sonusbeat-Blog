import { Award, CircleCheckBig, PartyPopper, Shield } from "lucide-react";
import styles from "./badges.module.css";
import Badge from "./badge.component";

export const Badges = () => {
  return (
    <>
      <h2 className={styles.sectionTitle}>Insignias</h2>

      <section className={styles.sectionBadges}>
        <Badge icon={CircleCheckBig} color="blue">
          <Badge.Title>Usuario Verificado</Badge.Title>
          <Badge.Description>
            El usuario ha sido autorizado por el administrador.
          </Badge.Description>
        </Badge>

        <Badge icon={Shield} color="purple">
          <Badge.Title>Administrador</Badge.Title>
          <Badge.Description>
            Usuarios administradores tienen acceso a todas las funciones y pueden gestionar usuarios.
          </Badge.Description>
        </Badge>

        <Badge icon={Award} color="yellow">
          <Badge.Title>Reconocido</Badge.Title>
          <Badge.Description>
            Este usuario ha sido reconocido por sus contribuciones.
          </Badge.Description>
        </Badge>

        <Badge icon={PartyPopper} color="green">
          <Badge.Title>Popular</Badge.Title>
          <Badge.Description>
            Este usuario ha sido popular en la comunidad.
          </Badge.Description>
        </Badge>
      </section>
    </>
  );
};

export default Badges;