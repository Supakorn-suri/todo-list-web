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

import { TodoCard } from "@/components/TodoCard";
import { CreateTodoModal } from "@/components/CreateTodoModal";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useTodos } from "@/context/TodoContext";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function Home() {
  const pinned = useHeadroom({ fixedAt: 120 });
  const { todos, loading, error } = useTodos();

  const [openedCreateTodo, { open: openCreateTodo, close: closeCreateTodo }] =
    useDisclosure(false);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: error || "Something went wrong",
        message: undefined,
        color: "red",
      });
    }
  }, [error]);

  return (
    <AppShell
      bg="#171717"
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
              {todos.length} Todos{" "}
            </Text>

            {loading ? (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </SimpleGrid>
            ) : todos.length === 0 ? (
              <Stack align="center" gap="sm" py="xl">
                <IconChecklist size={48} color="#9DA2AD" />
                <Text fw={600} c="#9DA2AD">
                  You have nothing to do
                </Text>
                <Text size="sm" c="dimmed">
                  Create your first todo to get started
                </Text>
              </Stack>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {todos.map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
              </SimpleGrid>
            )}

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
