'use client'
import io from 'socket.io-client'
import { TaskList } from "@/components/task/task-list";
import { useState } from 'react';
import { Task } from '@/types/Task';
import { apiUrl } from '@/utils/apiUrl';

const socket = io(apiUrl);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function fetchTasks() {
    const tasks = await fetch(`${apiUrl}/tasks`).then((res) => res.json())
    setTasks(tasks)
  }

  fetchTasks()

  socket.on('taskCreated', newTask => {
    setTasks([...tasks, newTask])
  })

  return (
    <main className="text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <TaskList tasks={tasks} />
    </main>
  );
}
