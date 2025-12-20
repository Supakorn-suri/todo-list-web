import { Card, Stack, Group, Skeleton } from "@mantine/core";

export const SkeletonCard = () => {
  return (
    <Card
      miw={300}
      w="100%"
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        background: "#111111",
        borderColor: "#1A202A",
        cursor: "pointer",
      }}
    >
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Skeleton height={18} width={80} radius="xl" />
          <Group gap={8}>
            <Skeleton height={22} width={22} radius="md" />
            <Skeleton height={22} width={22} radius="md" />
          </Group>
        </Group>
        <Skeleton height={14} radius="xl" />
        <Skeleton height={14} radius="xl" />
        <Group justify="flex-end">
          <Skeleton height={28} width={80} radius="xl" />
        </Group>
      </Stack>
    </Card>
  );
};
