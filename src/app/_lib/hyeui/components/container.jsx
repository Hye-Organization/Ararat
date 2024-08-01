export default function Container({ children, className, style }) {
  return (
    <div className={`container mx-auto px-4 ${className}`} style={style}>
      {children}
    </div>
  );
}
