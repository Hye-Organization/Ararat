import clsx from "clsx";

export default function Paper({
  className,
  children,
  light,
  style,
  glass,
  icon,
  iconBackground,
  dark,
  onClick,
}) {
  let bg = "bg-white dark:bg-slate-900";
  let iconBg = "dark:bg-slate-850";
  if (light) {
    bg = "bg-gray-100 dark:bg-white/5";
    iconBg = "dark:bg-slate-750";
  }
  if (dark) {
    bg = "dark:bg-slate-900";
    iconBg = "dark:bg-slate-800";
  }
  if (iconBackground) {
    iconBg = iconBackground;
  }

  return (
    <div
      className={`rounded-lg ${bg} shadow ${className} ${
        glass ? "dark:bg-opacity-65 backdrop-blur" : ""
      }`}
      style={style}
      onClick={onClick}
    >
      {icon ? (
        <div className="flex transition-all mb-0">
          <div
            className={clsx(
              `rounded-full p-5 w-20 h-20 mx-auto flex -mt-10 -mb-4 z-10`,
              iconBg
            )}
          >
            <div className="mx-auto my-auto">{icon}</div>
          </div>
        </div>
      ) : null}
      <div className="px-4 py-5 sm:p-6 overflow-hidden transition-all h-full">
        {children}
      </div>
    </div>
  );
}
