import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { content, control } from "./data";
import { NavUser } from "./nav-user.component";
import { SidebarLogo } from "./sidebar-logo.component";
import { SidebarManagement } from "./sidebar-content";
import { SidebarProjects } from "./sidebar-projects.component";
import { SidebarReleases } from "./sidebar-releases.component";
import { SidebarCategories } from "./sidebar-categories.component";
import { SidebarControl } from "./sidebar-control.component";

type Props = React.ComponentProps<typeof Sidebar>;

export const AppSidebar: React.FC<Props> = ({ ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader className="py-5">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarManagement items={content} />
        <SidebarProjects />
        <SidebarReleases />
        <SidebarCategories />
        <SidebarControl items={control} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  )
};

export default AppSidebar;
