import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import PublicLayout from "./(public)/public.layout";
import { MainContainer } from "@/components/main-container.component";

const HomePage = () => {
  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="text-primary text-5xl font-semibold text-center mb-10">Sonusbeat Blog</h1>

        <h2 className="text-secondary-foreground text-3xl font-semibold mb-2">Bienvenidos al Blog de Sonusbeat</h2>

        <p className="text-gray-500 italic mb-5">En este blog encontrarás noticias relevantes con la producción de música electrónica.</p>

        <div className="flex justify-end">
          <Button className="text-gray-200">
            Like <Heart strokeWidth={3} />
          </Button>
        </div>
      </MainContainer>
    </PublicLayout>
  );
};

export default HomePage;
