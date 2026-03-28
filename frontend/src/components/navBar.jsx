import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "./button";

export default function Navbar({ totalTasks, pendingCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-10 bg-card-bg/90 backdrop-blur border-b border-card-border transition-colors">
      <div className="w-full px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand hover:opacity-80 transition-colors">
          <span className="text-2xl">📋</span>
          Mis Chambas
        </Link>
        <div className="flex items-center gap-2">
          
          <Button 
            variant="ghost" 
            onClick={toggleTheme} 
            className="!px-2.5 !py-1.5"
            title={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          
          <Link to="/">
            <Button variant="ghost" className="!text-xs">
              Lista
              {totalTasks > 0 && (
                <span className="ml-1 bg-brand text-brand-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalTasks}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/agregar">
            <Button variant="primary" className="!text-xs">
              + Agregar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}