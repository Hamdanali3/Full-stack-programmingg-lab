"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, FileText, LayoutDashboard, LogOut, Users } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/chatbot", label: "Chatbot", icon: Bot }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-line bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block">
            <div>
              <p className="text-xs font-bold uppercase text-brand">CRM System</p>
              <h1 className="text-lg font-bold text-ink">HAMDAN ALI</h1>
            </div>
            <button className="btn-secondary lg:hidden" onClick={logout} type="button">
              <LogOut size={16} />
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
                    active ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden px-4 py-4 lg:block">
            <button className="btn-secondary w-full justify-start" onClick={logout} type="button">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>
        <div>
          <header className="border-b border-line bg-white px-5 py-4">
            <p className="text-sm text-slate-600">Logged in as</p>
            <p className="font-semibold text-ink">{user?.name}</p>
          </header>
          <main className="px-5 py-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
