import Link from "next/link";

export default function Button({
  children,
  color,
  size,
  className,
  disabled,
  onClick,
  href,
  loading
}) {
  //let btnColor = colors(color ?? undefined)
  let baseClass = `font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all border-t-2 rounded-lg`;

  if (!color) color = "blue";
  switch (color) {
    case "dark": {
      baseClass +=
        " bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-800 dark:border-zinc-700 border-zinc-900";
      break;
    }
    case "zinc": {
    }
    case "red": {
      baseClass +=
        " bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 border-red-500";
      break;
    }
    case "yellow": {
      baseClass +=
        " bg-yellow-300 hover:bg-yellow-200 focus-visible:outline-yellow-300 text-yellow-950 border-yellow-200";
      break;
    }
    case "green": {
      baseClass +=
        " bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 border-green-500";
      break;
    }
    case "indigo": {
      baseClass +=
        " bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 border-indigo-500";
      break;
    }
    default: {
      baseClass +=
        " bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600 border-blue-500";
      break;
    }
  }
  switch (size) {
    case "xs": {
      baseClass += " px-2 py-1 text-xs";
      break;
    }
    case "sm": {
      baseClass += " px-2 py-1 text-sm";
      break;
    }
    case "lg": {
      baseClass += " px-3 py-2 text-sm";
      break;
    }
    case "xl": {
      baseClass += " px-5 py-3 text-md";
      break;
    }
    default: {
      baseClass += " px-2.5 py-1.5 text-sm";
      break;
    }
  }
  if (loading) {
    disabled = true;
  }
  if (disabled) {
    baseClass +=
      " bg-gray-500 border-gray-400 cursor-not-allowed dark:hover:bg-gray-500 active:animate-shake";
  } else {
    baseClass += " active:scale-90 cursor-pointer";
  }
  return (
    <>
      {href ? (
        <Link className={`${className}`} href={href}>
          <button onClick={onClick} type="button" className={`${baseClass}`}>
            {children}
          </button>
        </Link>
      ) : (
        <button
          onClick={!disabled ? onClick : null}
          type="button"
          className={`${baseClass} ${className} ${loading ? "animate-pulse" : ""}`}
        >
 
          {children}

        </button>
      )}
    </>
  );
}
