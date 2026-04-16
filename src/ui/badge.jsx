function Badge({ label, config }) {
  const c = config[label];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {label}
    </span>
  );
}
export default Badge