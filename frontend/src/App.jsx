import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Componentes y Pantallas
import Navbar from "./components/navBar";
import Button from "./components/button";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("mis-tareas-v1", []);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-200">
        <Navbar totalTasks={tasks.length} pendingCount={pendingCount} />
        <Routes>
          <Route path="/" element={<TaskListPage tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />} />
          <Route path="/agregar" element={<AddTaskPage onAdd={addTask} />} />
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Página no encontrada</h2>
                <Link to="/"><Button variant="primary">Ir al inicio</Button></Link>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}