"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  AppShell,
  ActionIcon,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { IconChecklist, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { getTodos, Todo } from "@/api/todoApi";
import { TodoCard } from "@/components/TodoCard";
import { CreateTodoModal } from "@/components/CreateTodoModal";

export default function Home() {
  const pinned = useHeadroom({ fixedAt: 120 });
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoData = await getTodos();
        setTodos(todoData);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleCompletedChange = (id: number, completed: boolean) =>
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );

  const [openedCreateTodo, { open: openCreateTodo, close: closeCreateTodo }] =
    useDisclosure(false);

  return (
    <AppShell
      bg="black"
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header
        p="md"
        bg="#111111"
        style={{ borderColor: "#1A202A", borderWidth: "1.5px" }}
      >
        <Group justify="space-between">
          <Group gap="xs">
            <IconChecklist color="#FBD743" />
            <Text c="yellow.5" fw={700}>
              Todos
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main pt="var(--app-shell-header-height)">
        <Container size="xl" py="xl">
          <Stack gap={24}>
            <Group justify="space-between">
              <Title order={1} c="white">
                My Todos
              </Title>
              <ActionIcon
                bg="yellow.5"
                radius="lg"
                size="lg"
                onClick={openCreateTodo}
              >
                <IconPlus size={24} color="#111111" />
              </ActionIcon>
            </Group>

            <Text fw={600} c="#9DA2AD">
              {todos.length} Todos
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onCompletedChange={(checked) =>
                    handleCompletedChange(todo.id, checked)
                  }
                />
              ))}
            </SimpleGrid>

            <CreateTodoModal
              opened={openedCreateTodo}
              onClose={closeCreateTodo}
            />
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
