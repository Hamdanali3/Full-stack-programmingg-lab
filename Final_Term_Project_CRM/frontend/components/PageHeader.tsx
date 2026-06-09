export default function PageHeader({
  actions,
  subtitle,
  title
}: {
  actions?: React.ReactNode;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-ink">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {actions}
    </div>
  );
}
