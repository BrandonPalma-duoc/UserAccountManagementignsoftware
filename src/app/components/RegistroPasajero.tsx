import { useState, useRef } from "react";
import { AppShell } from "./AppShell";
import { CheckCircle, AlertTriangle, Upload, X, Search, Loader2 } from "lucide-react";

interface RegistroPasajeroProps {
  onNavigate: (screen: string) => void;
}

const PAISES = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador",
  "Paraguay", "Perú", "Uruguay", "Venezuela", "México", "Estados Unidos",
  "España", "Alemania", "Francia", "Italia", "China", "Otro",
];

type ValidacionEstado = "idle" | "loading" | "ok" | "error";

export function RegistroPasajero({ onNavigate }: RegistroPasajeroProps) {
  const [rut, setRut] = useState("");
  const [validacion, setValidacion] = useState<ValidacionEstado>("idle");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [tipoCruce, setTipoCruce] = useState<"entrada" | "salida" | "">("");
  const [esMenor, setEsMenor] = useState<"no" | "si" | "">("");
  const [archivoAutorizacion, setArchivoAutorizacion] = useState<File | null>(null);
  const [portaProductos, setPortaProductos] = useState<"no" | "si" | "">("");
  const [portaMascotas, setPortaMascotas] = useState<"no" | "si" | "">("");
  const [sagNotificado, setSagNotificado] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const handleValidar = () => {
    if (!rut.trim()) return;
    setValidacion("loading");
    setTimeout(() => {
      const valido = rut.length >= 8;
      setValidacion(valido ? "ok" : "error");
      if (valido) {
        setNombre("María José");
        setApellido("Contreras Vega");
        setNacionalidad("Chile");
        setFechaNac("1990-05-14");
      }
    }, 900);
  };

  const handleProductosSi = (val: "no" | "si") => {
    setPortaProductos(val);
    if (val === "si" && !sagNotificado) {
      setSagNotificado(true);
    }
  };

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setArchivoAutorizacion(f);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!rut.trim()) e.rut = "Ingrese RUT o número de pasaporte.";
    if (validacion !== "ok") e.rut = "Valide el documento antes de continuar.";
    if (!nombre.trim()) e.nombre = "Requerido.";
    if (!apellido.trim()) e.apellido = "Requerido.";
    if (!nacionalidad) e.nacionalidad = "Seleccione nacionalidad.";
    if (!fechaNac) e.fechaNac = "Ingrese fecha de nacimiento.";
    if (!tipoCruce) e.tipoCruce = "Seleccione tipo de cruce.";
    if (!esMenor) e.esMenor = "Indique si el pasajero es menor de edad.";
    if (esMenor === "si" && !archivoAutorizacion) e.autorizacion = "Adjunte la autorización notarial.";
    if (!portaProductos) e.portaProductos = "Campo requerido.";
    if (!portaMascotas) e.portaMascotas = "Campo requerido.";
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
      <AppShell onNavigate={onNavigate} active="pasajeros" showBack>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <div className="p-4 rounded-full bg-[#1e4a1e] border border-[#4caf50]/30">
            <CheckCircle size={40} className="text-[#4caf50]" />
          </div>
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
            Pasajero Registrado
          </h2>
          <p className="text-muted-foreground" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem" }}>
            {nombre} {apellido} · {tipoCruce === "entrada" ? "ENTRADA" : "SALIDA"} · Redirigiendo...
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell onNavigate={onNavigate} active="pasajeros" showBack>
      <div className="max-w-2xl mx-auto w-full py-8 px-4">
        {/* Title */}
        <div className="mb-6">
          <p className="text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
            Pantalla 3
          </p>
          <h2 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground">
            Registro de Pasajero
          </h2>
        </div>

        {/* SAG alert banner */}
        {sagNotificado && (
          <div className="flex items-start gap-3 bg-[#3a2a10] border border-[#ff9800]/40 rounded-sm px-4 py-3 mb-5">
            <AlertTriangle size={16} className="text-[#ff9800] mt-0.5 shrink-0" />
            <p style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }} className="text-[#ff9800]">
              Notificación enviada al Funcionario SAG. El pasajero debe ser derivado a revisión fitosanitaria.
            </p>
          </div>
        )}

        {/* Section: Datos Personales */}
        <section className="bg-card border border-border rounded-sm px-5 py-5 mb-4">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest mb-4">
            Datos Personales
          </h3>

          {/* RUT / Pasaporte */}
          <div className="mb-4">
            <Label>RUT / Pasaporte</Label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rut}
                onChange={(e) => { setRut(e.target.value); setValidacion("idle"); }}
                placeholder="12.345.678-9 o Nº pasaporte"
                className={`flex-1 bg-muted border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${errors.rut ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.82rem" }}
              />
              <button
                onClick={handleValidar}
                disabled={!rut.trim() || validacion === "loading"}
                className="flex items-center gap-1.5 px-4 py-2 bg-secondary border border-border rounded-sm text-foreground hover:border-[#d52b1e] transition-colors disabled:opacity-50"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem", whiteSpace: "nowrap" }}
              >
                {validacion === "loading"
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Search size={13} />
                }
                Validar
              </button>
            </div>
            {validacion === "ok" && (
              <p className="flex items-center gap-1 text-[#4caf50] mt-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem" }}>
                <CheckCircle size={12} /> Documento verificado en base de datos
              </p>
            )}
            {validacion === "error" && (
              <p className="flex items-center gap-1 text-[#d52b1e] mt-1" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem" }}>
                <AlertTriangle size={12} /> Documento no encontrado — verifique e ingrese manualmente
              </p>
            )}
            {errors.rut && <FieldError msg={errors.rut} />}
          </div>

          {/* Nombre / Apellido */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label>Nombre</Label>
              <TextInput value={nombre} onChange={setNombre} placeholder="Nombre(s)" error={errors.nombre} />
              {errors.nombre && <FieldError msg={errors.nombre} />}
            </div>
            <div>
              <Label>Apellido</Label>
              <TextInput value={apellido} onChange={setApellido} placeholder="Apellido(s)" error={errors.apellido} />
              {errors.apellido && <FieldError msg={errors.apellido} />}
            </div>
          </div>

          {/* Nacionalidad */}
          <div className="mb-4">
            <Label>Nacionalidad</Label>
            <select
              value={nacionalidad}
              onChange={(e) => setNacionalidad(e.target.value)}
              className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground focus:outline-none transition-colors ${errors.nacionalidad ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
              style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem" }}
            >
              <option value="">▼ Seleccionar país</option>
              {PAISES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.nacionalidad && <FieldError msg={errors.nacionalidad} />}
          </div>

          {/* Fecha Nacimiento */}
          <div className="mb-4">
            <Label>Fecha de Nacimiento</Label>
            <input
              type="date"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
              className={`w-full bg-muted border rounded-sm px-3 py-2 text-foreground focus:outline-none transition-colors ${errors.fechaNac ? "border-[#d52b1e]" : "border-border focus:border-[#d52b1e]"}`}
              style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.82rem" }}
            />
            {errors.fechaNac && <FieldError msg={errors.fechaNac} />}
          </div>

          {/* Tipo de cruce */}
          <div>
            <Label>Tipo de cruce</Label>
            <div className="flex gap-6 mt-1">
              <RadioOpt
                name="cruce"
                value="entrada"
                checked={tipoCruce === "entrada"}
                onChange={() => setTipoCruce("entrada")}
                label="Entrada"
              />
              <RadioOpt
                name="cruce"
                value="salida"
                checked={tipoCruce === "salida"}
                onChange={() => setTipoCruce("salida")}
                label="Salida"
              />
            </div>
            {errors.tipoCruce && <FieldError msg={errors.tipoCruce} />}
          </div>
        </section>

        {/* Section: Menor de edad */}
        <section className="bg-card border border-border rounded-sm px-5 py-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-[#ff9800]" />
            <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-foreground">
              ¿Es menor de 18 años?
            </h3>
          </div>
          <div className="flex gap-6 mb-3">
            <RadioOpt name="menor" value="no" checked={esMenor === "no"} onChange={() => setEsMenor("no")} label="No" />
            <RadioOpt name="menor" value="si" checked={esMenor === "si"} onChange={() => setEsMenor("si")} label="Sí" />
          </div>
          {errors.esMenor && <FieldError msg={errors.esMenor} />}

          {esMenor === "si" && (
            <div className="border border-dashed border-[#ff9800]/50 rounded-sm p-3 bg-[#3a2a10]/40">
              <p className="text-[#ff9800] mb-2" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.7rem" }}>
                Adjunte autorización notarial del tutor legal
              </p>
              {archivoAutorizacion ? (
                <div className="flex items-center gap-2 bg-muted rounded-sm px-3 py-2">
                  <CheckCircle size={13} className="text-[#4caf50]" />
                  <span className="flex-1 text-foreground truncate" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}>
                    {archivoAutorizacion.name}
                  </span>
                  <button onClick={() => setArchivoAutorizacion(null)}>
                    <X size={13} className="text-muted-foreground hover:text-[#d52b1e] transition-colors" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-muted-foreground hover:border-[#ff9800] hover:text-[#ff9800] transition-colors"
                  style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.72rem" }}
                >
                  <Upload size={13} /> Adjuntar archivo
                </button>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleArchivoChange} />
              {errors.autorizacion && <FieldError msg={errors.autorizacion} />}
            </div>
          )}
        </section>

        {/* Section: Declaración SAG */}
        <section className="bg-card border border-border rounded-sm px-5 py-4 mb-6">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.85rem" }} className="text-muted-foreground uppercase tracking-widest mb-4">
            Declaración SAG
          </h3>

          <div className="mb-3">
            <Label>¿Porta productos animales o vegetales?</Label>
            <div className="flex gap-6 mt-1">
              <RadioOpt name="productos" value="no" checked={portaProductos === "no"} onChange={() => handleProductosSi("no")} label="No" />
              <RadioOpt name="productos" value="si" checked={portaProductos === "si"} onChange={() => handleProductosSi("si")} label="Sí → notifica SAG" />
            </div>
            {errors.portaProductos && <FieldError msg={errors.portaProductos} />}
          </div>

          <div>
            <Label>¿Porta mascotas?</Label>
            <div className="flex gap-6 mt-1">
              <RadioOpt name="mascotas" value="no" checked={portaMascotas === "no"} onChange={() => setPortaMascotas("no")} label="No" />
              <RadioOpt name="mascotas" value="si" checked={portaMascotas === "si"} onChange={() => setPortaMascotas("si")} label="Sí" />
            </div>
            {errors.portaMascotas && <FieldError msg={errors.portaMascotas} />}
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
            REGISTRAR PASAJERO
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
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[#d52b1e] w-4 h-4"
      />
      <span className="text-foreground group-hover:text-foreground/80 transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem" }}>
        {label}
      </span>
    </label>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-[#d52b1e] mt-0.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
      {msg}
    </p>
  );
}
