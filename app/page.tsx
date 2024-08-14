'use client'
import io from 'socket.io-client'
import { TaskList } from "@/components/task/task-list";
import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';

const socket = io('http://localhost:3333');

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function fetchTasks() {
    const tasks = await fetch('http://localhost:3333/tasks').then((res) => res.json())
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
