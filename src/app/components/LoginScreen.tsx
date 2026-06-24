import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!rut || !password) {
      setError("Ingrese RUT y contraseña.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#d52b1e] mb-4 bg-card">
            <Shield size={28} className="text-[#d52b1e]" />
          </div>
          <h1 style={{ fontFamily: "'Roboto Slab', serif" }} className="text-foreground tracking-widest uppercase mb-1">
            Sistema Control Aduanero
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
            Paso Los Libertadores · Aduanas Chile
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-sm px-6 py-6">
          <p className="text-muted-foreground uppercase tracking-widest mb-5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
            Acceso al Sistema — PANTALLA 1
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-muted-foreground uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                RUT Funcionario
              </label>
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="12.345.678-9"
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label className="block text-muted-foreground uppercase tracking-widest mb-1.5" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.65rem" }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-muted border border-border rounded-sm px-3 py-2 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#d52b1e] transition-colors"
                  style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.85rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[#d52b1e]" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.75rem" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d52b1e] text-white py-2.5 rounded-sm uppercase tracking-widest hover:bg-[#b82419] transition-colors disabled:opacity-60"
              style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}
            >
              {loading ? "Verificando..." : "Ingresar al Sistema"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground mt-4" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.6rem" }}>
          Acceso restringido · Solo personal autorizado
        </p>
      </div>
    </div>
  );
}
