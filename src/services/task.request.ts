import { api } from "./api.request";

export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
}

const getTasks = async () => await api.get<Task[]>("/tasks");

const updateTask = async (id: string, body: {
  title?: string;
  description?: string;
  done?: boolean;
}) => await api.put(`/tasks/${id}`, body);

const deleteTask = async (id: string) => await api.delete(`/tasks/${id}`);

export { getTasks, updateTask, deleteTask };