import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { user } from "@/components/sidebar/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./user-card.module.css";

export const UserCard = () => {
  return (
    <Card>
      <CardHeader className={ styles.cardHeader }>
        <Avatar className={ styles.avatar }>
          <AvatarImage src={ user.avatar } />
          <AvatarFallback>DG</AvatarFallback>
        </Avatar>
        <CardTitle className={ styles.cardHeaderTitle }>
          { user.name }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={ styles.userBio }>
          { user.bio }
        </p>
      </CardContent>
    </Card>
  );
};

export default UserCard;