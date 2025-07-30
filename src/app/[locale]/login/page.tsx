import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { LoginForm } from "./(components)/login-form.component";
import LanguageSwitcher from "../../admin/(components)/navbar/language-switcher.component";

export const metadata: Metadata = {
  title: "Sonusbeat Blog",
  description: "Login to Sonusbeat Blog",
  robots: { index: false, follow: false, },
};

const LoginPage = async () => {
  const session = await auth();

  if(session?.user) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <section className="absolute top-10 right-10">
          <LanguageSwitcher />
        </section>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
