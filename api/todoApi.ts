import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

// http://localhost:3000/api/todos
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get<Todo[]>("/todos");
  return res.data;
};
