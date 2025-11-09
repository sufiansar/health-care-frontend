import Link from "next/link";
import RegisterForm from "@/components/modules/Auth/Register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold shadow transition hover:opacity-90"
        >
          Logo
        </Link>

        <div className="w-full rounded-xl bg-background p-6 shadow-md border border-border">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
