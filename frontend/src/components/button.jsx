export default function Button({ children, onClick, variant = "primary", type = "button", disabled = false, className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-brand hover:opacity-90 text-brand-foreground focus:ring-brand",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400",
    danger: "bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-400",
    ghost: "bg-transparent border border-slate-300 hover:bg-slate-100 text-slate-600 focus:ring-slate-400",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}