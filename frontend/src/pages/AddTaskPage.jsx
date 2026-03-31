

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import { validateTask } from "../utils/validations";

export default function AddTaskPage({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect #1: Limpia el error cada vez que el usuario modifica el texto
  useEffect(() => {
    if (error) setError("");
  }, [text]);

  // useEffect #2: Cambia el título del navegador al entrar/salir de esta página
  useEffect(() => {
    document.title = "Agregar Chamba | Mis Chambas";
    return () => {
      document.title = "Mis Chambas";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación completa con validateTask (antes solo había un .length >= 3)
    const validationError = validateTask(text);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAdd(text.trim())
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-12 pb-8 transition-colors duration-200">

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-app-text mb-3 transition-colors tracking-tight">
          Nueva Chamba
        </h1>
        <p className="text-text-muted transition-colors text-lg">
          Escribe el titulo de tu chamba y presiona Agregar. <br />
          O si ya te arrepentiste de chambiar, presiona Cancelar.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Tarjeta de Consejos */}
        <div className="w-full md:w-1/3 bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800/30 p-6 rounded-2xl transition-colors duration-200 sticky top-24">
          <h4 className="text-base font-bold text-violet-800 dark:text-brand flex items-center gap-2 mb-4">
            💡 Consejos Papu
          </h4>
          <ul className="text-sm text-violet-700 dark:text-slate-300 space-y-3 list-disc list-inside">
            <li>Sé específico: "Leer el nuevo manga de Record Of Ragnarok" es mejor que "Estudiar".</li>
            <li>Puedes presionar Enter para agregar rápidamente en el teclado.</li>
            <li>Las tareas se guardan automáticamente en tu navegador, no perderás nada.</li>
          </ul>
        </div>

        {/* Formulario Principal */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 bg-card-bg border border-card-border p-8 rounded-2xl shadow-sm transition-colors duration-200"
        >
          <div className="mb-6">
            {/*
              CORRECCIÓN: antes había <label> y <input> nativos aquí.
              Ahora se usa el componente reutilizable Input, que ya incluye
              ErrorMessage internamente cuando se le pasa la prop "error".
            */}
            <Input
              id="task"
              label="Nombre de la chamba."
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ej: Aprender a manejar estándar, Dejar de normalizar mi adicción..."
              error={error}
              maxLength={120}
              hint="Solo letras, números y puntuación básica."
            />
            <div className="flex justify-end mt-2 text-xs font-medium text-text-muted">
              <span className={text.length > 120 ? "text-rose-500" : ""}>
                {text.length}/120
              </span>
            </div>
          </div>

          {/* Caja de Reglas */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl mt-6 border border-slate-100 dark:border-slate-700/50 transition-colors duration-200">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
              REGLAS A LA HORA DE CREAR UNA CHAMBA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ul className="text-sm text-text-muted space-y-2 transition-colors">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  Al menos 3 caracteres
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  Al menos una letra
                </li>
              </ul>
              <ul className="text-sm text-text-muted space-y-2 transition-colors">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  Sin espacios al inicio/final
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  Máximo 120 caracteres
                </li>
              </ul>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-card-border">
            <Button type="submit" variant="primary" className="flex-1 py-3 text-base font-bold">
              + Agregar chamba
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex-1 py-3 text-base"
            >
              Soy huevón "Cancelar"
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}