import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

type MobileMenuProps = Readonly<{
  className?: string;
  toggleMobileMenu: () => void;
}>;

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const { className, toggleMobileMenu } = props;

  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn("border md:hidden", className)}
      onClick={toggleMobileMenu}
    >
      <span className="sr-only">Open menu</span>
      <Menu size={20} />
    </Button>
  );
};

export default MobileMenu;
