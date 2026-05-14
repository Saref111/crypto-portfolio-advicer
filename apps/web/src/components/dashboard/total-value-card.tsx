export function Card({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-green-600">{subtitle}</p>}
    </div>
  );
}
