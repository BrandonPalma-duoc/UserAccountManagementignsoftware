import { useState, useMemo } from "react";
import { AppShell } from "./AppShell";
import { FileDown, Filter, RefreshCw, Users, Car, CheckCircle, XCircle } from "lucide-react";

interface GenerarInformeProps {
  onNavigate: (screen: string) => void;
}

type TipoRegistro = "todos" | "pasajero" | "vehiculo";
type TipoCruce = "todos" | "entrada" | "salida";

const REGISTROS_MOCK = [
  { id: "P-001", tipo: "pasajero", nombre: "María José Contreras", doc: "12.345.678-9", cruce: "entrada", hora: "08:12", estado: "aprobado", nac: "Chile" },
  { id: "V-001", tipo: "vehiculo", nombre: "Toyota Hilux · ABCD12", doc: "ABCD12", cruce: "entrada", hora: "08:23", estado: "aprobado", nac: "Chile" },
  { id: "P-002", tipo: "pasajero", nombre: "Carlos Rodríguez Paz", doc: "ARG-8821044", cruce: "entrada", hora: "08:45", estado: "aprobado", nac: "Argentina" },
  { id: "P-003", tipo: "pasajero", nombre: "Luisa Fernanda Mora", doc: "COL-2239812", cruce: "salida", hora: "09:10", estado: "aprobado", nac: "Colombia" },
  { id: "V-002", tipo: "vehiculo", nombre: "Ford Ranger · XYZ987", doc: "XYZ987", cruce: "salida", hora: "09:14", estado: "rechazado", nac: "Argentina" },
  { id: "P-004", tipo: "pasajero", nombre: "Tomás Ibáñez Soto", doc: "15.882.334-2", cruce: "salida", hora: "09:30", estado: "aprobado", nac: "Chile" },
  { id: "V-003", tipo: "vehiculo", nombre: "Mercedes Sprinter · PER-442", doc: "PER-442", cruce: "entrada", hora: "09:55", estado: "aprobado", nac: "Perú" },
  { id: "P-005", tipo: "pasajero", nombre: "Ana Cecilia Vargas", doc: "PER-9924411", cruce: "entrada", hora: "10:02", estado: "aprobado", nac: "Perú" },
  { id: "P-006", tipo: "pasajero", nombre: "Jorge Luis Mamani", doc: "BOL-5512398", cruce: "entrada", hora: "10:18", estado: "pendiente", nac: "Bolivia" },
  { id: "V-004", tipo: "vehiculo", nombre: "Chevrolet S10 · EFGH34", doc: "EFGH34", cruce: "salida", hora: "10:44", estado: "aprobado", nac: "Chile" },
  { id: "P-007", tipo: "pasajero", nombre: "Sofía Beatriz Núñez", doc: "13.998.001-5", cruce: "entrada", hora: "11:03", estado: "aprobado", nac: "Chile" },
  { id: "V-005", tipo: "vehiculo", nombre: "Mitsubishi L200 · IJKL56", doc: "IJKL56", cruce: "entrada", hora: "11:22", estado: "rechazado", nac: "Chile" },
];

const getDayName = (d: Date) => ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][d.getDay()];
const getMonthName = (d: Date) => ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][d.getMonth()];

export function GenerarInforme({ onNavigate }: GenerarInformeProps) {
  const now = new Date();
  const [fechaInicio, setFechaInicio] = useState(now.toISOString().slice(0, 10));
  const [fechaFin, setFechaFin] = useState(now.toISOString().slice(0, 10));
  const [tipoRegistro, setTipoRegistro] = useState<TipoRegistro>("todos");
  const [tipoCruce, setTipoCruce] = useState<TipoCruce>("todos");
  const [aplicado, setAplicado] = useState(true);
  const [exportando, setExportando] = useState(false);

  const registros = useMemo(() => {
    if (!aplicado) return [];
    return REGISTROS_MOCK.filter((r) => {
      if (tipoRegistro !== "todos" && r.tipo !== tipoRegistro) return false;
      if (tipoCruce !== "todos" && r.cruce !== tipoCruce) return false;
      return true;
    });
  }, [aplicado, tipoRegistro, tipoCruce]);

  const stats = useMemo(() => ({
    total: registros.length,
    pasajeros: registros.filter((r) => r.tipo === "pasajero").length,
    vehiculos: registros.filter((r) => r.tipo === "vehiculo").length,
    entradas: registros.filter((r) => r.cruce === "entrada").length,
    salidas: registros.filter((r) => r.cruce === "salida").length,
    aprobados: registros.filter((r) => r.estado === "aprobado").length,
    rechazados: registros.filter((r) => r.estado === "rechazado").length,
    pendientes: registros.filter((r) => r.estado === "pendiente").length,
  }), [registros]);

  const handleExportar = () => {
    setExportando(true);
    setTimeout(() => setExportando(false), 1200);
  };

  return (
    <AppShell onNavigate={onNavigate} active="reportes" showBack>
      <div className="max-w-4xl mx-auto w-full py-8 px-4">
        {/* Title */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
              Pantalla 5
            </p>
            <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
              Generar Informe
            </h2>
            <p className="text-muted-foreground mt-0.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.7rem" }}>
              {getDayName(now)} {String(now.getDate()).padStart(2, "0")} {getMonthName(now)} {now.getFullYear()} · Paso Los Libertadores
            </p>
          </div>
          <button
            onClick={handleExportar}
            disabled={exportando || registros.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-sm text-muted-foreground hover:border-[#4caf50] hover:text-[#4caf50] transition-colors disabled:opacity-40"
            style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}
          >
            {exportando ? <RefreshCw size={13} className="animate-spin" /> : <FileDown size={13} />}
            {exportando ? "Exportando..." : "Exportar PDF"}
          </button>
        </div>

        {/* Filters */}
        <section className="bg-card border border-border rounded-sm px-5 py-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={13} className="text-muted-foreground" />
            <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest">
              Filtros
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-3 items-end">
            <div>
              <Label>Fecha inicio</Label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => { setFechaInicio(e.target.value); setAplicado(false); }}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.78rem" }}
              />
            </div>
            <div>
              <Label>Fecha fin</Label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => { setFechaFin(e.target.value); setAplicado(false); }}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.78rem" }}
              />
            </div>
            <div>
              <Label>Tipo de registro</Label>
              <select
                value={tipoRegistro}
                onChange={(e) => { setTipoRegistro(e.target.value as TipoRegistro); setAplicado(false); }}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}
              >
                <option value="todos">Todos</option>
                <option value="pasajero">Pasajeros</option>
                <option value="vehiculo">Vehículos</option>
              </select>
            </div>
            <div>
              <Label>Tipo de cruce</Label>
              <select
                value={tipoCruce}
                onChange={(e) => { setTipoCruce(e.target.value as TipoCruce); setAplicado(false); }}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}
              >
                <option value="todos">Todos</option>
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => setAplicado(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#d52b1e] text-white rounded-sm hover:bg-[#b82419] transition-colors"
              style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em" }}
            >
              <Filter size={12} /> APLICAR FILTROS
            </button>
          </div>
        </section>

        {/* Stats cards */}
        {aplicado && registros.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            <StatCard label="Total registros" value={stats.total} />
            <StatCard label="Pasajeros" value={stats.pasajeros} icon={<Users size={13} className="text-muted-foreground" />} />
            <StatCard label="Vehículos" value={stats.vehiculos} icon={<Car size={13} className="text-muted-foreground" />} />
            <StatCard label="Pendientes" value={stats.pendientes} accent />
          </div>
        )}

        {/* Table */}
        {aplicado && (
          <section className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <span className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                Registros del período
              </span>
              <span className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                {registros.length} resultado{registros.length !== 1 ? "s" : ""}
              </span>
            </div>

            {registros.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.78rem" }}>
                No hay registros que coincidan con los filtros seleccionados.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      {["ID", "Tipo", "Nombre / Identificación", "Documento", "Cruce", "Hora", "Estado"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem", fontWeight: 500 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registros.map((r, i) => (
                      <tr key={r.id} className={`border-b border-border last:border-0 hover:bg-secondary/40 transition-colors ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                        <td className="px-4 py-2.5 text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}>{r.id}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border text-xs ${r.tipo === "pasajero" ? "border-[#0039a6]/40 text-[#5b8ab8] bg-[#0039a6]/10" : "border-[#ff9800]/30 text-[#ff9800] bg-[#ff9800]/10"}`} style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.62rem" }}>
                            {r.tipo === "pasajero" ? <Users size={10} /> : <Car size={10} />}
                            {r.tipo === "pasajero" ? "Pasajero" : "Vehículo"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-foreground" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}>{r.nombre}</td>
                        <td className="px-4 py-2.5 text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}>{r.doc}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-xs uppercase tracking-widest ${r.cruce === "entrada" ? "text-[#4caf50]" : "text-[#ff9800]"}`} style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.62rem" }}>
                            {r.cruce}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}>{r.hora}</td>
                        <td className="px-4 py-2.5">
                          {r.estado === "aprobado" && (
                            <span className="inline-flex items-center gap-1 text-[#4caf50]" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                              <CheckCircle size={11} /> Aprobado
                            </span>
                          )}
                          {r.estado === "rechazado" && (
                            <span className="inline-flex items-center gap-1 text-[#d52b1e]" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                              <XCircle size={11} /> Rechazado
                            </span>
                          )}
                          {r.estado === "pendiente" && (
                            <span className="inline-flex items-center gap-1 text-[#ff9800]" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                              ● Pendiente
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Footer actions */}
        <div className="flex justify-end mt-5">
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-2.5 border border-border rounded-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            VOLVER AL DASHBOARD
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.62rem" }}>
      {children}
    </label>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon?: React.ReactNode; accent?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-sm px-4 py-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
          {label}
        </span>
      </div>
      <p style={{ fontFamily: "'Roboto Slab', serif", fontSize: "1.6rem", lineHeight: 1 }} className={accent ? "text-[#d52b1e]" : "text-foreground"}>
        {value}
      </p>
    </div>
  );
}
