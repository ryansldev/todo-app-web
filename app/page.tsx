import { Task } from "@/components/task/task";
import { TaskList } from "@/components/task/task-list";

export default function Home() {
  return (
    <main className="text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <TaskList>
        <Task
          id={"1"}
          title="Tarefa de número um"
          done={false}
        />
        <Task
          id={"2"}
          title="Tarefa de número dois"
          done={true}
        />
      </TaskList>
    </main>
  );
}
