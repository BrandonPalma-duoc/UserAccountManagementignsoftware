import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderScreenProps {
  title: string;
  pantalla: string;
  onBack: () => void;
}

const screenInfo: Record<string, { pantalla: string; desc: string }> = {
  pasajeros: { pantalla: "PANTALLA 3", desc: "Registro de Pasajero" },
  vehiculos: { pantalla: "PANTALLA 4", desc: "Registro de Vehículo" },
  reportes: { pantalla: "PANTALLA 5", desc: "Generar Informe" },
};

export function PlaceholderScreen({ title, onBack }: PlaceholderScreenProps) {
  const info = screenInfo[title] || { pantalla: "PANTALLA X", desc: title };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: "0.8rem" }}
        >
          <ArrowLeft size={16} />
          Volver al Dashboard
        </button>
        <span className="text-border">|</span>
        <span className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
          {info.pantalla} — {info.desc}
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div className="p-4 rounded-full bg-card border border-border">
          <Construction size={32} className="text-muted-foreground" />
        </div>
        <div className="text-center">
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground mb-2">
            {info.desc}
          </h2>
          <p className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem" }}>
            {info.pantalla} · En construcción para esta iteración
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-[#d52b1e] text-white rounded-sm uppercase tracking-widest hover:bg-[#b82419] transition-colors"
          style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.75rem" }}
        >
          Regresar al Dashboard
        </button>
      </main>
    </div>
  );
}
