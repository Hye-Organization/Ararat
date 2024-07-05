export default function Progress({ percent }) {
  return (
    <div>
      <div aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-slate-850">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all"
            style={{ width: percent + "%" }}
          />
        </div>
      </div>
    </div>
  );
}
