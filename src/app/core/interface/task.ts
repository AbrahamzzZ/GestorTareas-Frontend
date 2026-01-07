export interface Task {
  id: string;
  title?: string;
  completed?: boolean;
  createdAt: string;
}

export interface UpdateTaskDto {
  title?: string;
  completed?: boolean;
}