import CreateNode from "./createNode";

export default async function Nodes() {
  return (
    <div className="flex">
      <p className="text-3xl font-bold">Nodes</p>
      <CreateNode URI={process.env.URI} />
    </div>
  );
}
