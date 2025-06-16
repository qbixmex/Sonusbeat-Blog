import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const OpenPublicPage: React.FC = () => {
  return (
    <Button
      size="icon"
      variant="secondary"
      className="border"
      asChild
    >
      <a href="/" target="_blank" rel="noopener noreferrer">
        <span className="sr-only">Open public page</span>
        <Globe size={20} />
      </a>
    </Button>
  );
};

export default OpenPublicPage;
