export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="rounded-md shadow-2 p-4 border-2 min-w-50 mt-1">
      <div className="text-md font-bold shadow mb-2">{title}</div>
      {children}
    </div>
  );
}
