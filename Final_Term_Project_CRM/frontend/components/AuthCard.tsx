import Link from "next/link";
import BackendStatus from "@/components/BackendStatus";

export default function AuthCard({
  children,
  footer,
  title
}: {
  children: React.ReactNode;
  footer: "login" | "register";
  title: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Final Term CRM</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">Customer Relationship Management System by HAMDAN ALI</p>
        <div className="mt-6">
          <BackendStatus />
        </div>
        <div>{children}</div>
        <p className="mt-6 text-center text-sm text-slate-600">
          {footer === "login" ? "Already have an account?" : "New to the CRM?"}{" "}
          <Link className="font-semibold text-brand hover:underline" href={footer === "login" ? "/login" : "/register"}>
            {footer === "login" ? "Login" : "Create account"}
          </Link>
        </p>
      </section>
    </main>
  );
}
