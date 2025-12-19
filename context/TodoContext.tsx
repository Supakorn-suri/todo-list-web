"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getTodosApi, Todo } from "@/api/todoApi";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  getTodos: () => Promise<void>;
  // add, edit, del
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const todoData = await getTodosApi();
      setTodos(todoData);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        getTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
