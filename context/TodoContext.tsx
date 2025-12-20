"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { getTodosApi, Todo } from "@/api/todoApi";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  getTodos: () => Promise<void>;
  addTodo: (title: string, content: string) => void;
  updateTodo: (id: number, title: string, content: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const nextId = useRef(6); // id start after mock data (5 items)

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

  const addTodo = (title: string, content: string) => {
    const newTodo: Todo = {
      id: nextId.current++,
      title,
      content,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: number, title: string, content: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title, content } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
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
