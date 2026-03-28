export default function errorMessage({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-0.5">
      <span className="inline-block w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-center leading-3.5 text-[9px] font-bold flex-shrink-0">!</span>
      {message}
    </p>
  );
}