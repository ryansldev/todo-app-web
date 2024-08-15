export interface Task {
  id: string;
  title: string;
  done: boolean;
  deadline?: Date;
  description?: Date;
  createdAt: Date;
  updatedAt: Date;
}