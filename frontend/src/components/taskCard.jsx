import Button from "./button";
import Badge from "./badge";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200
        ${task.completed
          ? "bg-slate-50/50 dark:bg-slate-800/50 border-card-border opacity-75"
          : "bg-card-bg border-card-border hover:border-brand hover:shadow-sm"
        }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-app-bg
          ${task.completed
            ? "bg-brand border-brand focus:ring-brand"
            : "border-slate-300 dark:border-slate-600 hover:border-brand focus:ring-brand"
          }`}
      >
        {task.completed && (
          <svg className="w-full h-full p-0.5 text-brand-foreground" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium break-words transition-colors ${task.completed ? "line-through text-text-muted" : "text-app-text"}`}>
          {task.text}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge completed={task.completed} />
          <span className="text-xs text-text-muted">{task.createdAt}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 !px-2 !py-1 text-rose-400 hover:text-rose-600 hover:!bg-rose-50 dark:hover:!bg-rose-500/10 border-transparent hover:border-rose-200 dark:hover:border-rose-500/30"
        title="Eliminar tarea"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5l.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Button>
    </div>
  );
}