import {
  ActionIcon,
  Card,
  CardProps,
  Chip,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash, IconEdit, IconCircleFilled } from "@tabler/icons-react";

interface NoteCardProps extends CardProps {
  id: string | number;
  title: string;
  content: string;
  completed: boolean;
  onCompletedChange?: (checked: boolean) => void;
}

export const NoteCard = ({
  id,
  title,
  content,
  completed,
  onCompletedChange,
  ...rest
}: NoteCardProps) => {
  return (
    <Card
      key={id}
      miw={300}
      w="100%"
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        background: "#111111",
        borderColor: "#1A202A",
      }}
      {...rest}
    >
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title
            order={4}
            c="white"
            lineClamp={1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {title}
          </Title>
          <Group gap={8}>
            <ActionIcon variant="subtle" size="sm" radius="sm" color="#7F3232">
              <IconTrash size={16} />
            </ActionIcon>
            <ActionIcon variant="light" size="sm" radius="sm" color="yellow">
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Text c="gray.6" lineClamp={3} size="sm">
          {content}
        </Text>
        <Group justify="flex-end">
          <Chip
            checked={completed}
            onChange={(checked) => onCompletedChange?.(checked)}
            variant="light"
            color={completed ? "teal" : "gray"}
            styles={{
              label: {
                backgroundColor: completed ? undefined : "#2D2D2D80",
                paddingInline: 12,
                color: completed ? undefined : "white",
              },
            }}
          >
            <Group gap={6} p={0}>
              {!completed && <IconCircleFilled color="#FBD743" size={10} />}
              {completed ? "Done" : "Todo"}
            </Group>
          </Chip>
        </Group>
      </Stack>
    </Card>
  );
};
