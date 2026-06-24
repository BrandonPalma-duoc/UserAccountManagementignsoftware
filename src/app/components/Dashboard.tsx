import { Users, Car, FileText, Clock, UserCog, LogOut, ChevronRight, TrendingUp, ArrowUpRight, ArrowDownLeft, AlertCircle } from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const navCards = [
  {
    id: "pasajeros",
    icon: Users,
    title: "Pasajeros",
    action: "Registrar",
    screen: "pasajeros",
    color: "border-l-[#d52b1e]",
    available: true,
  },
  {
    id: "vehiculos",
    icon: Car,
    title: "Vehículos",
    action: "Registrar",
    screen: "vehiculos",
    color: "border-l-[#d52b1e]",
    available: true,
  },
  {
    id: "reportes",
    icon: FileText,
    title: "Reportes",
    action: "Generar",
    screen: "reportes",
    color: "border-l-[#d52b1e]",
    available: true,
  },
  {
    id: "historial",
    icon: Clock,
    title: "Historial",
    action: "Consultar",
    screen: "historial",
    color: "border-l-[#5b8ab8]",
    available: false,
    tag: "iteración 2",
  },
  {
    id: "gestion",
    icon: UserCog,
    title: "Gestión",
    action: "Usuarios",
    screen: "gestion",
    color: "border-l-[#5b8ab8]",
    available: false,
    tag: "iteración 2",
  },
];

const getDayName = (date: Date) => {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[date.getDay()];
};

const getMonthName = (date: Date) => {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return months[date.getMonth()];
};

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
  const dateStr = `${getDayName(now)} ${String(now.getDate()).padStart(2, "0")} ${getMonthName(now)} ${now.getFullYear()}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Chilean flag stripe */}
          <div className="flex flex-col h-8 w-1.5 rounded-sm overflow-hidden">
            <div className="flex-1 bg-[#d52b1e]" />
            <div className="flex-1 bg-foreground" />
            <div className="flex-1 bg-[#0039a6]" />
          </div>
          <div>
            <h1
              style={{ fontFamily: "'Roboto Slab', serif" }}
              className="tracking-widest uppercase text-foreground"
            >
              Sistema Control Aduanero
            </h1>
            <p className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.7rem" }}>
              SCA · PASO LOS LIBERTADORES · SII / ADUANAS CHILE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-border text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem" }}>
            F. Aduana
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-border text-muted-foreground hover:border-[#d52b1e] hover:text-[#d52b1e] transition-colors"
            style={{ fontSize: "0.8rem" }}
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
        {/* Greeting */}
        <div className="mb-8">
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground mb-1">
            {greeting}, Funcionario.
          </h2>
          <div className="flex items-center gap-3 text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.8rem" }}>
            <span>{dateStr}</span>
            <span className="opacity-40">·</span>
            <span>Paso Los Libertadores</span>
          </div>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => card.available && onNavigate(card.screen)}
                disabled={!card.available}
                className={`
                  relative text-left bg-card border border-border border-l-4 ${card.color}
                  rounded-sm px-5 py-5 group transition-all duration-200
                  ${card.available
                    ? "hover:bg-secondary hover:border-[#d52b1e] cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                  }
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded bg-muted ${card.available ? "group-hover:bg-[#d52b1e]/10" : ""} transition-colors`}>
                    <Icon size={20} className={`text-muted-foreground ${card.available ? "group-hover:text-[#d52b1e]" : ""} transition-colors`} />
                  </div>
                  {card.available ? (
                    <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  ) : (
                    <span className="text-muted-foreground border border-border rounded px-1.5 py-0.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.05em" }}>
                      {card.tag}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Roboto Mono', monospace" }}>
                  {card.action}
                </p>
                <h3 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
                  {card.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Statistics bar */}
        <div className="border border-border rounded-sm bg-card px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                Cruces hoy
              </span>
            </div>
            <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
              {String(now.getHours()).padStart(2, "0")}:{String(now.getMinutes()).padStart(2, "0")} hrs
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-[#1e4a1e]">
                <ArrowDownLeft size={14} className="text-[#4caf50]" />
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
                  Entrada
                </p>
                <p style={{ fontFamily: "'Roboto Slab', serif", fontSize: "1.5rem", lineHeight: 1 }} className="text-foreground">
                  342
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-x border-border px-4">
              <div className="p-1.5 rounded bg-[#3a1e10]">
                <ArrowUpRight size={14} className="text-[#ff9800]" />
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
                  Salida
                </p>
                <p style={{ fontFamily: "'Roboto Slab', serif", fontSize: "1.5rem", lineHeight: 1 }} className="text-foreground">
                  289
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-4">
              <div className="p-1.5 rounded bg-[#3a1a1a]">
                <AlertCircle size={14} className="text-[#d52b1e]" />
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
                  Pendiente
                </p>
                <p style={{ fontFamily: "'Roboto Slab', serif", fontSize: "1.5rem", lineHeight: 1 }} className="text-[#d52b1e]">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-2 flex items-center justify-between">
        <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
          CU12 — Gestionar cuenta de usuario · Diseñado por: Yohan Roa
        </span>
        <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
          v2.1.0 · SCA
        </span>
      </footer>
    </div>
  );
}
