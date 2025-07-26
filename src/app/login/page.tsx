import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { LoginForm } from "./(components)/login-form.component";

export const metadata: Metadata = {
  robots: { index: false, follow: false, },
};

const LoginPage = async () => {
  const session = await auth();

  if(session?.user) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
