import React, { FC, ReactElement, ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./badges.module.css";

type Color = "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "white";

type BadgeProps = {
  children: ReactNode;
  icon: LucideIcon;
  color?: Color;
};

type BadgeTitleProps = { children: ReactNode };
type BadgeDescriptionProps = { children: ReactNode };

const BadgeTitle: React.FC<BadgeTitleProps> = ({ children }) => (
  <h3 className={styles.badgeHoverTitle}>{children}</h3>
);

const BadgeDescription: React.FC<BadgeDescriptionProps> = ({ children }) => (
  <p className={styles.badgeHoverDescription}>{children}</p>
);

export const Badge: FC<BadgeProps> & {
  Title: typeof BadgeTitle;
  Description: typeof BadgeDescription;
} = ({ children, icon, color = "gray" }) => {
  let title: ReactNode = null;
  let description: ReactNode = null;

  React.Children.forEach(children, child => {
    if (!child || typeof child !== "object") return;
    if ((child as ReactElement).type === BadgeTitle) title = child;
    if ((child as ReactElement).type === BadgeDescription) description = child;
  });

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className={cn("cursor-pointer", styles.badge, {
          [styles.badgeBlue]: color === "blue",
          [styles.badgeGreen]: color === "green",
          [styles.badgeRed]: color === "red",
          [styles.badgeYellow]: color === "yellow",
          [styles.badgePurple]: color === "purple",
          [styles.badgeGray]: color === "gray",
        })}>
          <BadgeIcon color="white" icon={icon} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        sideOffset={12}
        className={styles.badgeHover}
      >
        <div className={styles.badgeHoverHeader}>
          { title } <BadgeIcon color={color} icon={icon} />
        </div>
        { description }
      </HoverCardContent>
    </HoverCard>
  );
};

type BadgeIconProps = {
  icon: LucideIcon;
  color: Color;
};

const BadgeIcon: FC<BadgeIconProps> = (props) => {
  const { icon: Icon, color = "gray" } = props;

  return (
    <Icon className={cn({
      "text-gray-400": color === "gray",
      "text-blue-600": color === "blue",
      "text-green-600": color === "green",
      "text-red-600": color === "red",
      "text-yellow-600": color === "yellow",
      "text-purple-600": color === "purple",
      "text-neutral-50": color === "white",
    })} />
  );
};

Badge.Title = BadgeTitle;
Badge.Description = BadgeDescription;

export default Badge;