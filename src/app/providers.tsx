import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

type Props = {
  readonly children?: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        { children }
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;