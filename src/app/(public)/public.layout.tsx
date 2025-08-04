import { Navbar } from "@/components/navbar/navbar.component";

type Props = Readonly<{
  children: React.ReactNode;
  urlParams?: {
    locale: string;
    category: string;
    slug?: string;
  }[];
}>;

const RootLayout: React.FC<Props> = ({ children, urlParams }) => {
  return (
    <>
      <Navbar urlParams={urlParams} />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
