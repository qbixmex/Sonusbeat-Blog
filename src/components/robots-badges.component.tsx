import { type FC } from "react";
import { Badge } from "./ui/badge";
import { cn, renderRobots } from "../lib/utils";

export const RobotsBadges: FC<{seoRobots: string}> = ({ seoRobots }) => {
  return (
    <Badge className={cn("text-sm lowercase", {
      "bg-emerald-500 text-emerald-50 dark:bg-emerald-600 dark:text-emerald-100": seoRobots === "index_follow",
      "bg-purple-400 text-purple-50 dark:bg-purple-600 dark:text-purple-200": seoRobots === "noindex_follow",
      "bg-amber-400 text-amber-900 dark:bg-amber-600 dark:text-amber-100": seoRobots === "index_nofollow",
      "bg-stone-700 text-stone-300 dark:bg-stone-700 dark:text-bg-stone-100": seoRobots === "noindex_nofollow",
    })}>
      {renderRobots(seoRobots)}
    </Badge>
  );
};

export default RobotsBadges;
