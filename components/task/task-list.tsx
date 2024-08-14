interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({
  children
}: TaskListProps) {
  return (
    <div className="flex flex-col items-start max-w-[300px] mx-auto gap-4 bg-slate-800 rounded-lg p-10">
      {children}
    </div>
  )
}