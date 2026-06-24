import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { PlaceholderScreen } from "./components/PlaceholderScreen";

type Screen = "login" | "dashboard" | "pasajeros" | "vehiculos" | "reportes";

export default function App() {
  {/* MARKER-MAKE-KIT-INVOKED */}
  const [screen, setScreen] = useState<Screen>("login");

  const navigate = (target: string) => {
    setScreen(target as Screen);
  };

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
  }

  if (screen === "dashboard") {
    return <Dashboard onNavigate={navigate} onLogout={() => setScreen("login")} />;
  }

  return (
    <PlaceholderScreen
      title={screen}
      pantalla={screen}
      onBack={() => setScreen("dashboard")}
    />
  );
}
