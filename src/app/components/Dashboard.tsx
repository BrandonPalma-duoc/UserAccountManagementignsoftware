import { Users, Car, FileText, Clock, UserCog, ChevronRight, TrendingUp, ArrowUpRight, ArrowDownLeft, AlertCircle } from "lucide-react";
import { AppShell } from "./AppShell";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const navCards = [
  { id: "pasajeros", icon: Users,   title: "Pasajeros", action: "Registrar",  screen: "pasajeros", accentLeft: "border-l-[#d52b1e]", available: true },
  { id: "vehiculos", icon: Car,     title: "Vehículos", action: "Registrar",  screen: "vehiculos", accentLeft: "border-l-[#d52b1e]", available: true },
  { id: "reportes",  icon: FileText, title: "Reportes",  action: "Generar",    screen: "reportes",  accentLeft: "border-l-[#d52b1e]", available: true },
  { id: "historial", icon: Clock,   title: "Historial", action: "Consultar",  screen: "historial", accentLeft: "border-l-[#5b8ab8]", available: false, tag: "iteración 2" },
  { id: "gestion",   icon: UserCog, title: "Gestión",   action: "Usuarios",   screen: "gestion",   accentLeft: "border-l-[#5b8ab8]", available: false, tag: "iteración 2" },
];

const getDayName = (d: Date) => ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][d.getDay()];
const getMonthName = (d: Date) => ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][d.getMonth()];

export function Dashboard({ onNavigate }: DashboardProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
  const dateStr = `${getDayName(now)} ${String(now.getDate()).padStart(2, "0")} ${getMonthName(now)} ${now.getFullYear()}`;

  return (
    <AppShell onNavigate={onNavigate} active="dashboard">
      <div className="max-w-3xl mx-auto w-full py-10 px-4">
        {/* Greeting */}
        <div className="mb-10">
          <p className="text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
            Pantalla 2 — Dashboard Principal
          </p>
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground mb-1">
            {greeting}, Funcionario.
          </h2>
          <div className="flex items-center gap-3 text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.78rem" }}>
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
                className={`relative text-left bg-card border border-border border-l-4 ${card.accentLeft} rounded-sm px-5 py-5 group transition-all duration-200 ${card.available ? "hover:bg-secondary hover:shadow-lg cursor-pointer" : "opacity-55 cursor-not-allowed"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded bg-muted ${card.available ? "group-hover:bg-[#d52b1e]/10" : ""} transition-colors`}>
                    <Icon size={20} className={`text-muted-foreground ${card.available ? "group-hover:text-[#d52b1e]" : ""} transition-colors`} />
                  </div>
                  {card.available ? (
                    <ChevronRight size={15} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  ) : (
                    <span className="text-muted-foreground border border-border rounded px-1.5 py-0.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.05em" }}>
                      {card.tag}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Roboto Mono', monospace" }}>
                  {card.action}
                </p>
                <h3 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
                  {card.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="border border-border rounded-sm bg-card px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-muted-foreground" />
              <span className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.62rem" }}>
                Cruces hoy
              </span>
            </div>
            <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.62rem" }}>
              {String(now.getHours()).padStart(2, "0")}:{String(now.getMinutes()).padStart(2, "0")} hrs
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatBlock icon={<ArrowDownLeft size={13} className="text-[#4caf50]" />} bg="bg-[#1e4a1e]" label="Entrada" value="342" color="text-foreground" />
            <div className="border-x border-border px-4">
              <StatBlock icon={<ArrowUpRight size={13} className="text-[#ff9800]" />} bg="bg-[#3a1e10]" label="Salida" value="289" color="text-foreground" />
            </div>
            <StatBlock icon={<AlertCircle size={13} className="text-[#d52b1e]" />} bg="bg-[#3a1a1a]" label="Pendiente" value="5" color="text-[#d52b1e]" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatBlock({ icon, bg, label, value, color }: { icon: React.ReactNode; bg: string; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded ${bg}`}>{icon}</div>
      <div>
        <p className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.58rem" }}>{label}</p>
        <p style={{ fontFamily: "'Roboto Slab', serif", fontSize: "1.5rem", lineHeight: 1 }} className={color}>{value}</p>
      </div>
    </div>
  );
}
