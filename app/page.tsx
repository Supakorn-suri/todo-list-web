"use client";

import { useState } from "react";
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
import { useHeadroom } from "@mantine/hooks";
import { IconNote, IconPlus } from "@tabler/icons-react";
import { NoteCard } from "@/components/NoteCard";

// TODO: replace with API
const mockNotes = [
  {
    id: 1,
    title: "delectus aut autem",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 4,
    title: "et porro tempora",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: true,
  },
  {
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
];

export default function Home() {
  const pinned = useHeadroom({ fixedAt: 120 });
  const [notes, setNotes] = useState(mockNotes);

  const handleCompletedChange = (id: number, completed: boolean) =>
    setNotes((notes) =>
      notes.map((note) => (note.id === id ? { ...note, completed } : note))
    );

  return (
    <AppShell
      bg="black"
      header={{
        height: 60,
        collapsed: !pinned,
        offset: false,
      }}
      padding="md"
    >
      <AppShell.Header
        p="md"
        bg="#111111"
        style={{ borderColor: "#1A202A", borderWidth: "1.5px" }}
      >
        <Group justify="space-between">
          <Group gap="xs">
            <IconNote color="#FBD743" />
            <Text c="yellow.5" fw={700}>
              Notes
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main pt="var(--app-shell-header-height)">
        <Container size="xl" py="xl">
          <Stack gap={32}>
            <Stack gap={12}>
              <Group justify="space-between">
                <Title order={1} c="white">
                  My notes
                </Title>

                <ActionIcon bg="yellow.5" radius="lg" size="lg">
                  <IconPlus size={24} color="#111111" strokeWidth={2} />
                </ActionIcon>
              </Group>

              <Text size="md" fw={600} c="#9DA2AD">
                {notes.length} Notes
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  completed={note.completed}
                  onCompletedChange={(checked) =>
                    handleCompletedChange(note.id, checked)
                  }
                />
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
