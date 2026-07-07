import { useState } from "react";
import { AppShell } from "./AppShell";
import { CheckCircle, AlertTriangle, Search, Loader2 } from "lucide-react";

interface RegistroVehiculoProps {
  onNavigate: (screen: string) => void;
}

const TIPOS_VEHICULO = ["Automóvil", "Camioneta", "Camión", "Bus", "Motocicleta", "Casa rodante", "Otro"];
const PAISES_PLACA = ["Chile", "Argentina", "Bolivia", "Brasil", "Perú", "Uruguay", "Paraguay", "Otro"];

type ValidacionEstado = "idle" | "loading" | "ok" | "error";

export function RegistroVehiculo({ onNavigate }: RegistroVehiculoProps) {
  const [patente, setPatente] = useState("");
  const [validacion, setValidacion] = useState<ValidacionEstado>("idle");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [paisPlaca, setPaisPlaca] = useState("");
  const [tipoCruce, setTipoCruce] = useState<"entrada" | "salida" | "">("");
  const [cantPasajeros, setCantPasajeros] = useState("1");
  const [portaCarga, setPortaCarga] = useState<"no" | "si" | "">("");
  const [descCarga, setDescCarga] = useState("");
  const [pesoKg, setPesoKg] = useState("");
  const [inspeccion, setInspeccion] = useState<"aprobado" | "rechazado" | "">("");
  const [observaciones, setObservaciones] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrado, setRegistrado] = useState(false);

  const handleValidarPatente = () => {
    if (!patente.trim()) return;
    setValidacion("loading");
    setTimeout(() => {
      const valida = /^[A-Z0-9]{4,8}$/i.test(patente.replace(/[-\s]/g, ""));
      setValidacion(valida ? "ok" : "error");
      if (valida) {
        setMarca("Toyota");
        setModelo("Hilux");
        setAnio("2021");
        setTipoVehiculo("Camioneta");
        setPaisPlaca("Chile");
      }
    }, 900);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patente.trim()) e.patente = "Ingrese la patente del vehículo.";
    if (validacion !== "ok") e.patente = "Valide la patente antes de continuar.";
    if (!tipoVehiculo) e.tipoVehiculo = "Seleccione tipo de vehículo.";
    if (!marca.trim()) e.marca = "Requerido.";
    if (!modelo.trim()) e.modelo = "Requerido.";
    if (!anio.trim()) e.anio = "Requerido.";
    if (!paisPlaca) e.paisPlaca = "Seleccione país de la placa.";
    if (!tipoCruce) e.tipoCruce = "Seleccione tipo de cruce.";
    if (!portaCarga) e.portaCarga = "Indique si porta carga.";
    if (portaCarga === "si" && !descCarga.trim()) e.descCarga = "Describa la carga.";
    if (!inspeccion) e.inspeccion = "Registre el resultado de inspección.";
    return e;
  };

  const handleRegistrar = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setRegistrado(true);
    setTimeout(() => onNavigate("dashboard"), 1800);
  };

  if (registrado) {
    return (
      <AppShell onNavigate={onNavigate} active="vehiculos" showBack>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <div className="p-4 rounded-full bg-[#1e4a1e] border border-[#4caf50]/30">
            <CheckCircle size={40} className="text-[#4caf50]" />
          </div>
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
            Vehículo Registrado
          </h2>
          <p className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem" }}>
            {patente} · {marca} {modelo} · {tipoCruce === "entrada" ? "ENTRADA" : "SALIDA"} · Redirigiendo...
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell onNavigate={onNavigate} active="vehiculos" showBack>
      <div className="max-w-2xl mx-auto w-full py-8 px-4">
        <div className="mb-6">
          <p className="text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
            Pantalla 4
          </p>
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
            Registro de Vehículo
          </h2>
        </div>

        {/* Datos del vehículo */}
        <section className="bg-card border border-border rounded-sm px-5 py-5 mb-4">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest mb-4">
            Datos del Vehículo
          </h3>

          {/* Patente */}
          <div className="mb-4">
            <Label>Patente / Placa</Label>
            <div className="flex gap-2">
              <input
                type="text"
                value={patente}
                onChange={(e) => { setPatente(e.target.value.toUpperCase()); setValidacion("idle"); }}
                placeholder="ABCD12 / AB-1234"
                className={`flex-1 bg-muted border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${errors.patente ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.9rem", letterSpacing: "0.12em" }}
              />
              <button
                onClick={handleValidarPatente}
                disabled={!patente.trim() || validacion === "loading"}
                className="flex items-center gap-1.5 px-4 py-2 bg-secondary border border-border rounded-sm text-foreground hover:border-[#d52b1e] transition-colors disabled:opacity-50"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", whiteSpace: "nowrap" }}
              >
                {validacion === "loading" ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
                Validar
              </button>
            </div>
            {validacion === "ok" && (
              <p className="flex items-center gap-1 text-[#4caf50] mt-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem" }}>
                <CheckCircle size={12} /> Vehículo encontrado en Registro Nacional
              </p>
            )}
            {validacion === "error" && (
              <p className="flex items-center gap-1 text-[#d52b1e] mt-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem" }}>
                <AlertTriangle size={12} /> Patente no encontrada — complete los datos manualmente
              </p>
            )}
            {errors.patente && <FieldError msg={errors.patente} />}
          </div>

          {/* Tipo vehículo */}
          <div className="mb-4">
            <Label>Tipo de vehículo</Label>
            <select
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
              className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground focus:outline-none transition-colors ${errors.tipoVehiculo ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
              style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem" }}
            >
              <option value="">▼ Seleccionar tipo</option>
              {TIPOS_VEHICULO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.tipoVehiculo && <FieldError msg={errors.tipoVehiculo} />}
          </div>

          {/* Marca / Modelo / Año */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <Label>Marca</Label>
              <TextInput value={marca} onChange={setMarca} placeholder="Toyota" error={errors.marca} />
              {errors.marca && <FieldError msg={errors.marca} />}
            </div>
            <div>
              <Label>Modelo</Label>
              <TextInput value={modelo} onChange={setModelo} placeholder="Hilux" error={errors.modelo} />
              {errors.modelo && <FieldError msg={errors.modelo} />}
            </div>
            <div>
              <Label>Año</Label>
              <TextInput value={anio} onChange={setAnio} placeholder="2021" error={errors.anio} />
              {errors.anio && <FieldError msg={errors.anio} />}
            </div>
          </div>

          {/* País placa / Tipo cruce / Pasajeros */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <Label>País de la placa</Label>
              <select
                value={paisPlaca}
                onChange={(e) => setPaisPlaca(e.target.value)}
                className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground focus:outline-none transition-colors ${errors.paisPlaca ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}
              >
                <option value="">▼ País</option>
                {PAISES_PLACA.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.paisPlaca && <FieldError msg={errors.paisPlaca} />}
            </div>
            <div>
              <Label>Tipo de cruce</Label>
              <div className="flex flex-col gap-1.5 mt-1">
                <RadioOpt name="cruceveh" value="entrada" checked={tipoCruce === "entrada"} onChange={() => setTipoCruce("entrada")} label="Entrada" />
                <RadioOpt name="cruceveh" value="salida" checked={tipoCruce === "salida"} onChange={() => setTipoCruce("salida")} label="Salida" />
              </div>
              {errors.tipoCruce && <FieldError msg={errors.tipoCruce} />}
            </div>
            <div>
              <Label>Nº pasajeros a bordo</Label>
              <input
                type="number"
                min="1"
                max="60"
                value={cantPasajeros}
                onChange={(e) => setCantPasajeros(e.target.value)}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.85rem" }}
              />
            </div>
          </div>
        </section>

        {/* Declaración de carga */}
        <section className="bg-card border border-border rounded-sm px-5 py-4 mb-4">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest mb-4">
            Declaración de Carga
          </h3>
          <div className="mb-3">
            <Label>¿El vehículo porta carga o mercancías?</Label>
            <div className="flex gap-6 mt-1">
              <RadioOpt name="carga" value="no" checked={portaCarga === "no"} onChange={() => setPortaCarga("no")} label="No" />
              <RadioOpt name="carga" value="si" checked={portaCarga === "si"} onChange={() => setPortaCarga("si")} label="Sí" />
            </div>
            {errors.portaCarga && <FieldError msg={errors.portaCarga} />}
          </div>
          {portaCarga === "si" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Descripción de la carga</Label>
                <textarea
                  value={descCarga}
                  onChange={(e) => setDescCarga(e.target.value)}
                  rows={2}
                  placeholder="Ej: mercadería textil, alimentos envasados..."
                  className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none resize-none transition-colors ${errors.descCarga ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
                  style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}
                />
                {errors.descCarga && <FieldError msg={errors.descCarga} />}
              </div>
              <div>
                <Label>Peso estimado (kg)</Label>
                <input
                  type="number"
                  value={pesoKg}
                  onChange={(e) => setPesoKg(e.target.value)}
                  placeholder="0"
                  className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                  style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.85rem" }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Inspección */}
        <section className="bg-card border border-border rounded-sm px-5 py-4 mb-6">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest mb-4">
            Resultado de Inspección
          </h3>
          <div className="flex gap-4 mb-3">
            <button
              onClick={() => setInspeccion("aprobado")}
              className={`flex-1 py-2.5 rounded-sm border transition-colors ${inspeccion === "aprobado" ? "bg-[#1e4a1e] border-[#4caf50] text-[#4caf50]" : "border-border text-muted-foreground hover:border-[#4caf50]"}`}
              style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em" }}
            >
              ✓ APROBADO
            </button>
            <button
              onClick={() => setInspeccion("rechazado")}
              className={`flex-1 py-2.5 rounded-sm border transition-colors ${inspeccion === "rechazado" ? "bg-[#3a1a1a] border-[#d52b1e] text-[#d52b1e]" : "border-border text-muted-foreground hover:border-[#d52b1e]"}`}
              style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em" }}
            >
              ✕ RECHAZADO
            </button>
          </div>
          {errors.inspeccion && <FieldError msg={errors.inspeccion} />}
          <div>
            <Label>Observaciones (opcional)</Label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={2}
              placeholder="Notas adicionales del funcionario..."
              className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#d52b1e] resize-none transition-colors"
              style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-2.5 border border-border rounded-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            CANCELAR
          </button>
          <button
            onClick={handleRegistrar}
            className="px-6 py-2.5 bg-[#d52b1e] text-white rounded-sm hover:bg-[#b82419] transition-colors"
            style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.82rem", letterSpacing: "0.06em" }}
          >
            REGISTRAR VEHÍCULO
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

function TextInput({ value, onChange, placeholder, error }: { value: string; onChange: (v: string) => void; placeholder: string; error?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${error ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
      style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem" }}
    />
  );
}

function RadioOpt({ name, value, checked, onChange, label }: { name: string; value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="accent-[#d52b1e] w-4 h-4" />
      <span className="text-foreground" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem" }}>{label}</span>
    </label>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-[#d52b1e] mt-0.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>{msg}</p>
  );
}
