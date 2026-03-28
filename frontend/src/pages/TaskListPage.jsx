import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";
import EmptyState from "../components/EmptyState";
import TaskCard from "../components/taskCard";

export default function TaskListPage({ tasks, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        
        {/* Encabezado */}
        <div>
          <h1 className="text-4xl font-bold text-app-text mb-2 transition-colors tracking-tight">Mis PapuTareas</h1>
          <p className="text-sm text-slate-500 font-medium">
            {tasks.length === 0
              ? "Aún no tienes papuchambas registradas."
              : `${pendingCount} pendiente${pendingCount !== 1 ? "s" : ""} · ${completedCount} completada${completedCount !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        {tasks.length > 0 && (
          <div className="flex gap-3">
            {[
              { label: "Total", value: tasks.length, color: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/20" },
              { label: "Pendientes", value: pendingCount, color: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20" },
              { label: "Completadas", value: completedCount, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20" },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl border px-4 py-2 text-center transition-colors ${stat.color}`}>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filtros */}
      {tasks.length > 0 && (
        <div className="flex gap-2 mb-6 pb-4 border-b border-card-border">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200
                ${filter === f
                  ? "bg-brand text-brand-foreground shadow-sm"
                  : "bg-card-bg text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 border border-card-border"
                }`}
            >
              {{ all: "Todas las chambas", pending: "Por hacer", completed: "Terminadas" }[f]}
            </button>
          ))}
        </div>
      )}

      {/* Lista de tareas o estado vacío */}
      {tasks.length === 0 ? (
        <EmptyState
          icon="🗒️"
          title="Estás libre de pendientes papu"
          description="Comienza agregando tu primer papu chamba para mantenerte organizado. Bv"
          action={
            <Link to="/agregar">
              <Button variant="primary">+ Empieza agregando una papuchamba</Button>
            </Link>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Sin resultados"
          description={`No tienes tareas ${filter === "pending" ? "pendientes" : "completadas"} en este momento.`}
          action={<Button variant="ghost" onClick={() => setFilter("all")}>Ver todas</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}