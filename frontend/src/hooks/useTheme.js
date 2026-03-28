import { useState, useEffect } from "react";

export function useTheme() {
  // 1. Estado inicial: busca en localStorage, o por defecto 'light'
const [theme, setTheme] = useState(() => {
    try {
        return window.localStorage.getItem("app-theme") || "light";
    } catch {
        return "light";
    }
});

  // 2. Efecto: Cada vez que el tema cambia, actualiza el HTML y el localStorage
useEffect(() => {
    const root = window.document.documentElement; // El tag <html>
    
    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

    try {
        window.localStorage.setItem("app-theme", theme);
    } catch {
      // Manejo silencioso si localStorage no está disponible
    }
}, [theme]);

  // 3. Función para alternar entre temas
const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
};

return { theme, toggleTheme };
}