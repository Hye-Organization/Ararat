export default function Typography({ variant, children }) {
  return (
    <>
      {variant == "h1" ? (
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {children}
        </h1>
      ) : null}
    </>
  );
}
