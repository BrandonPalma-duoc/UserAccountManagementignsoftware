import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { RegistroPasajero } from "./components/RegistroPasajero";
import { RegistroVehiculo } from "./components/RegistroVehiculo";
import { GenerarInforme } from "./components/GenerarInforme";

{/* MARKER-MAKE-KIT-INVOKED */}

type Screen = "login" | "dashboard" | "pasajeros" | "vehiculos" | "reportes";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  const navigate = (target: string) => {
    // Only allow known screens; anything else falls back to dashboard
    const known: Screen[] = ["login", "dashboard", "pasajeros", "vehiculos", "reportes"];
    setScreen(known.includes(target as Screen) ? (target as Screen) : "dashboard");
  };

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
  }

  if (screen === "dashboard") {
    return <Dashboard onNavigate={navigate} />;
  }

  if (screen === "pasajeros") {
    return <RegistroPasajero onNavigate={navigate} />;
  }

  if (screen === "vehiculos") {
    return <RegistroVehiculo onNavigate={navigate} />;
  }

  if (screen === "reportes") {
    return <GenerarInforme onNavigate={navigate} />;
  }

  return null;
}
