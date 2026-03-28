import ErrorMessage from "./errorMessage";

export default function Input({ id, label, value, onChange, placeholder, error, maxLength, hint, onKeyDown }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>}
      <input
        id={id} type="text" value={value} onChange={onChange} onKeyDown={onKeyDown}
        placeholder={placeholder} maxLength={maxLength}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 ${error ? "border-rose-400 focus:ring-rose-300 bg-rose-50" : "border-slate-300 focus:ring-violet-400 focus:border-violet-400"}`}
      />
      {hint && !error && <span className="text-xs text-slate-400">{hint}</span>}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}