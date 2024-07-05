export default function Badge({ color, children, className }) {
  if (!color) color = "gray";
  let customClass = `bg-${color}-400/10 text-${color}-400 ring-1 ring-inset ring-${color}-400/20 ${className}`;
  return (
    <>
      <div className="bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20 hidden" />
      <div className="bg-green-400/10 text-green-400 ring-1 ring-inset ring-green-400/20 hidden" />
      <div className="bg-orange-400/10 text-orange-400 ring-1 ring-inset ring-orange-400/20 hidden" />
      <div className="bg-blue-400/10 text-blue-400 ring-1 ring-inset ring-blue-400/20 hidden" />
      <div className="bg-yellow-400/10 text-yellow-400 ring-1 ring-inset ring-yellow-400/20 hidden" />

      <span
        className={
          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset " +
          customClass
        }
      >
        {children}
      </span>
    </>
  );
}
