import { Navbar } from "@/components/navbar/navbar.component";

type Props = Readonly<{ children: React.ReactNode; }>;

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
