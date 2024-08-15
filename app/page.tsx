'use client'
import io from 'socket.io-client'
import { TaskList } from "@/components/task/task-list";
import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';
import { apiUrl } from '@/utils/apiUrl';

const socket = io(apiUrl);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function fetchTasks() {
    const tasks = await fetch(`${apiUrl}/tasks`).then((res) => res.json())
    setTasks(tasks)
  }
  
  socket.on('taskCreated', (newTask: Task) => {
    setTasks([...tasks, newTask])
  })

  socket.on('taskDeleted', (deletedTaskId: Task['id']) => {
    setTasks(tasks.filter((task) => task.id !== deletedTaskId))
  })

  socket.on('taskFinished', (finishedTaskId: Task['id']) => {
    setTasks(tasks.filter((task) => task.id !== finishedTaskId))
  })
  
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <main className="text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <TaskList tasks={tasks} />
    </main>
  );
}
