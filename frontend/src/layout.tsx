import { ChevronRight } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Database,
  AppWindow,
  Activity,
  ShieldCheck,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Smart Scan", icon: Sparkles, path: "/" },
  { label: "Storage", icon: Database, path: "/storage" },
  { label: "Applications", icon: AppWindow, path: "/applications" },
  { label: "System Monitor", icon: Activity, path: "/system-monitor" },
  { label: "Privacy", icon: ShieldCheck, path: "/privacy" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main>
      <section className="window">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">
              <span />
              <span />
              <span />
            </div>
            <span>Mo Clean Mac</span>
          </div>

          <nav className="nav">
            {navItems.map(({ label, icon: Icon, path }) => {
              const active = path === location.pathname;
              return (
                <button
                  key={label}
                  className={`nav-item ${active ? "active" : ""}`}
                  onClick={() => navigate(path)}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <button className="health-card">
            <span className="health-dot" />
            <span className="health-copy">
              <strong>System Healthy</strong>
              <small>All good</small>
            </span>
            <ChevronRight size={17} />
          </button>
        </aside>
        <div className="content">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
