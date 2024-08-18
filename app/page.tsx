'use client'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';
import { apiUrl } from '@/utils/apiUrl';
import { TasksTable } from '@/components/task/tasks-table';
import { CreateTaskForm } from '@/components/task/create-task-form';

const socket = io(apiUrl);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function fetchTasks() {
    const tasks = await fetch(`${apiUrl}/tasks`).then((res) => res.json())
    setTasks(tasks)
  }
  
  useEffect(() => {
    socket.on('taskCreated', (newTask: Task) => {
      setTasks([...tasks, newTask])
    })
  
    socket.on('taskEdited', (newTaskList: Task[]) => {
      setTasks(newTaskList)
    })
  
    socket.on('taskDeleted', (deletedTaskId: Task['id']) => {
      setTasks(tasks.filter((task) => task.id !== deletedTaskId))
    })
  
    socket.on('taskFinished', (finishedTaskId: Task['id']) => {
      setTasks(tasks.filter((task) => task.id !== finishedTaskId))
    })
  }, [])
  
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <main className="text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <TasksTable tasks={tasks} />
      <CreateTaskForm />
    </main>
  );
}
