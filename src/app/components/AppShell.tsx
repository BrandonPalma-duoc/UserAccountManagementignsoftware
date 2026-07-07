import { ArrowLeft, Users, Car, FileText } from "lucide-react";

type ActiveSection = "pasajeros" | "vehiculos" | "reportes" | "dashboard" | "";

interface AppShellProps {
  onNavigate: (screen: string) => void;
  active?: ActiveSection;
  showBack?: boolean;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { id: "pasajeros", label: "Pasajeros", screen: "pasajeros", Icon: Users },
  { id: "vehiculos", label: "Vehículos", screen: "vehiculos", Icon: Car },
  { id: "reportes", label: "Reportes", screen: "reportes", Icon: FileText },
];

export function AppShell({ onNavigate, active = "", showBack = false, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 py-0 flex items-stretch">
        {/* Logo / back */}
        <div className="flex items-center gap-3 pr-6 border-r border-border py-3">
          {showBack && (
            <button
              onClick={() => onNavigate("dashboard")}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Volver al dashboard"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 group"
          >
            <div className="flex flex-col h-6 w-1 rounded-sm overflow-hidden shrink-0">
              <div className="flex-1 bg-[#d52b1e]" />
              <div className="flex-1 bg-foreground" />
              <div className="flex-1 bg-[#0039a6]" />
            </div>
            <span
              style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.78rem", letterSpacing: "0.12em" }}
              className="text-foreground uppercase group-hover:text-foreground/80 transition-colors hidden sm:block"
            >
              SCA
            </span>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex items-stretch gap-0 ml-2">
          {NAV_ITEMS.map(({ id, label, screen, Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(screen)}
              className={`flex items-center gap-2 px-4 border-b-2 transition-colors ${
                active === id
                  ? "border-[#d52b1e] text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em" }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3 pl-6 border-l border-border py-3">
          <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem" }}>
            F. Aduana · Paso Los Libertadores
          </span>
          <button
            onClick={() => onNavigate("login")}
            className="px-3 py-1 border border-border rounded-sm text-muted-foreground hover:border-[#d52b1e] hover:text-[#d52b1e] transition-colors"
            style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-2 flex items-center justify-between shrink-0">
        <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
          CU12 — Gestionar cuenta de usuario · Diseñado por: Yohan Roa
        </span>
        <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
          v2.1.0 · SCA
        </span>
      </footer>
    </div>
  );
}
