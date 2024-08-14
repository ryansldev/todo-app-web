import { TaskList } from "@/components/task/task-list";

export default async function Home() {
  const tasks = await fetch('http://localhost:3333/tasks').then((res) => res.json())

  return (
    <main className="text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <TaskList tasks={tasks} />
    </main>
  );
}
